import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, SearchFilterTaskDto, UpdateTaskDto } from './dtos';

import { TaskModel } from './tasks.model';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksServices {
  private tasks: TaskModel[] = [];

  async getFilterSearchTasks(
    searchFilterTaskDto?: SearchFilterTaskDto,
  ): Promise<TaskModel[]> {
    if (!searchFilterTaskDto)
      return TaskRepository.createQueryBuilder('tasks').getMany();
    return TaskRepository.find(searchFilterTaskDto);
  }
  async create(createTaskDto: CreateTaskDto): Promise<TaskModel> {
    const task = await TaskRepository.create(createTaskDto);
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
