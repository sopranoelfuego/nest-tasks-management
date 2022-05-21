import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto, SearchFilterTaskDto, UpdateTaskDto } from './dtos';

import { TaskModel } from './tasks.model';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksServices {
  private tasks: TaskModel[] = [];

  async getFilterSearchTasks(
    searchFilterTaskDto: SearchFilterTaskDto,
    user: User,
  ): Promise<TaskModel[]> {
    if (!searchFilterTaskDto)
      return TaskRepository.createQueryBuilder('tasks').getMany();
    return TaskRepository.find(searchFilterTaskDto, user);
  }
  async create(createTaskDto: CreateTaskDto, user: User): Promise<TaskModel> {
    const task = await TaskRepository.create(createTaskDto, user);
    return task;
  }
  async getById(id: string): Promise<TaskModel> {
    const task = await TaskRepository.findOneBy({ id });
    if (!task)
      throw new NotFoundException(` task with ${id} as id is not found`);
    return task;
  }

  // async update(updateTaskDto: UpdateTaskDto): Promise<TaskModel> {}
}
