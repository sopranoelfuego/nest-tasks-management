import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateTaskDto, SearchFilterTask } from './dtos/index.dto';
import { TaskModel } from './tasks.model';
import { TasksServices } from './tasks.services';
@Controller('tasks')
export default class tasksController {
  constructor(private tasksService: TasksServices) {}
  @Get()
  getAll(@Query() searchFilter: SearchFilterTask): TaskModel[] {
    if (Object.keys(searchFilter).length) {
      return this.tasksService.getFilterSearchTasks(searchFilter);
    }
    return this.tasksService.getAll();
  }
  @Post()
  create(@Body() createTaskDto: CreateTaskDto): TaskModel {
    return this.tasksService.create(createTaskDto);
  }
}
