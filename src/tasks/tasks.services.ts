import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto, SearchFilterTaskDto, UpdateTaskDto } from './dtos';

import { TaskModel } from './tasks.model';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksServices {
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
  async getById(id: string, user: User): Promise<TaskModel> {
    const task = await TaskRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!task)
      throw new NotFoundException(`task with ${id} as id is not found`);
    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<TaskModel> {
    const updatedTask = await TaskRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!updatedTask)
      throw new NotFoundException(`task not found with ${id} as id`);
    try {
      updatedTask.title = updateTaskDto.title;
      updatedTask.description = updateTaskDto.description;
      await updatedTask.save();
      return updatedTask;
    } catch (error) {
      throw new Error('error task not updated');
    }
  }
  async delete(id: string, user: User): Promise<string> {
    const result = await TaskRepository.delete({ id, userId: user.id });
    if (result.affected === 0)
      throw new NotFoundException('error Task not found ');
    return 'successfull deleted';
  }
}
