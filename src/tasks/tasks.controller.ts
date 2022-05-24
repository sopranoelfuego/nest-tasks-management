import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto, SearchFilterTaskDto, UpdateTaskDto } from './dtos';
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
  async getTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<TaskModel> {
    return this.tasksService.getById(id, user);
  }
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<TaskModel> {
    return this.tasksService.update(id, updateTaskDto, user);
  }
  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<TaskModel> {
    return this.tasksService.create(createTaskDto, user);
  }
  @Delete('/:id')
  async delete(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<string> {
    return this.tasksService.delete(id, user);
  }
}
