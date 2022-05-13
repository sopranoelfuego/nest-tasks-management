import { Injectable } from '@nestjs/common';
import { CreateTaskDto, SearchFilterTaskDto, UpdateTaskDto } from './dtos';

import { TaskModel, taskStatus } from './tasks.model';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksServices {
  private tasks: TaskModel[] = [];
  getAll(): Promise<TaskModel[]> {
    return TaskRepository.find();
  }
  async getFilterSearchTasks(
    searchFilter: SearchFilterTaskDto,
  ): Promise<TaskModel[]> {
    let tasks: TaskModel[] = [];
    const { status, search } = searchFilter;
    //   case of no search or filter value provided we have to return all tasks
    tasks = await this.getAll();
    // case of status as keyWord
    if (status) {
      tasks = tasks.filter((t) => t.status === status);
    }
    // case of search as keyWord
    if (search) {
      tasks = tasks.filter((t) => {
        if (t.description.includes(search) || t.title.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }
  async create(createTaskDto: CreateTaskDto): Promise<TaskModel> {
    const task = await TaskRepository.create(createTaskDto);
    return task;
  }

  // async update(updateTaskDto: UpdateTaskDto): Promise<TaskModel> {}
}
