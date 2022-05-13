import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateTaskDto, SearchFilterTaskDto } from './dtos';
import { TaskModel } from './tasks.model';
import { TaskRepository } from './tasks.repository';
import { TasksServices } from './tasks.services';
@Controller('tasks')
export default class tasksController {
  constructor(private tasksService: TasksServices) {}
  @Get()
  async getAll(
    @Query() searchFilter: SearchFilterTaskDto,
  ): Promise<TaskModel[]> {
    if (Object.keys(searchFilter).length) {
      return this.tasksService.getFilterSearchTasks(searchFilter);
    }
    return this.tasksService.getAll();
  }
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskModel> {
    return this.tasksService.create(createTaskDto);
  }
}
