import { Injectable } from '@nestjs/common';
import { CreateTaskDto, SearchFilterTaskDto, UpdateTaskDto } from './dtos';

import { TaskModel } from './tasks.model';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksServices {
  private tasks: TaskModel[] = [];

  async getFilterSearchTasks(
    searchFilterTaskDto?: SearchFilterTaskDto,
  ): Promise<TaskModel[]> {
    return TaskRepository.find(searchFilterTaskDto);
  }
  async create(createTaskDto: CreateTaskDto): Promise<TaskModel> {
    const task = await TaskRepository.create(createTaskDto);
    return task;
  }

  // async update(updateTaskDto: UpdateTaskDto): Promise<TaskModel> {}
}
