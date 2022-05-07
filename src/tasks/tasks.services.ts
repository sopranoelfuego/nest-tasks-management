import { Injectable } from '@nestjs/common';
import { CreateTaskDto, SearchFilterTask } from './dtos/index.dto';
import { TaskModel, taskStatus } from './tasks.model';
@Injectable()
export class TasksServices {
  private tasks: TaskModel[] = [];
  getAll(): TaskModel[] {
    return [
      {
        title: 'new task',
        description: 'babalao',
        status: taskStatus.OPEN,
      },
    ];
  }
  getFilterSearchTasks(searchFilter: SearchFilterTask): TaskModel[] {
    let tasks: TaskModel[] = [];
    const { status, search } = searchFilter;
    //   case of no search or filter value provided we have to return all tasks
    tasks = this.getAll();
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
  create(createTaskDto: CreateTaskDto): TaskModel {
    return {
      title: 'new task',
      description: 'description from post task',
      status: taskStatus.OPEN,
    };
  }
}
