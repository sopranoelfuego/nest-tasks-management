import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto, SearchFilterTaskDto } from './dtos';
import { TaskModel } from './tasks.model';
import { TasksServices } from './tasks.services';
@Controller('tasks')
@UseGuards(AuthGuard())
export default class tasksController {
  constructor(private tasksService: TasksServices) {}
  @Get()
  async getAll(
    @Query() searchFilter: SearchFilterTaskDto,
    @GetUser() user: User,
  ): Promise<TaskModel[]> {
    return this.tasksService.getFilterSearchTasks(searchFilter, user);
  }
  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<TaskModel> {
    return this.tasksService.getById(id);
  }

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<TaskModel> {
    return this.tasksService.create(createTaskDto, user);
  }
}
