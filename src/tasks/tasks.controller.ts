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
import { GetUser } from '../auth/get-user-decorator';
import { User } from '../auth/user.entity';
import { CreateTaskDto, SearchFilterTaskDto, UpdateTaskDto } from './dtos';
import { TaskModel } from './tasks.model';
import { TasksServices } from './tasks.services';
import { Logger } from '@nestjs/common';
@Controller('tasks')
@UseGuards(AuthGuard())
export default class tasksController {
  private Logger = new Logger();
  constructor(private tasksService: TasksServices) {}
  @Get()
  async getAll(
    @Query() searchFilter: SearchFilterTaskDto,
    @GetUser() user: User,
  ): Promise<TaskModel[]> {
    this.Logger.verbose(
      `user ${
        user.username
      } is retrievings tasks and filters are ${JSON.stringify(searchFilter)}`,
    );
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
