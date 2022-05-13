import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntitySchema } from 'typeorm';
import tasksController from './tasks.controller';
import { Task } from './tasks.entity';
import { TaskRepository } from './tasks.repository';
import { TasksServices } from './tasks.services';

@Module({
  controllers: [tasksController],
  providers: [TasksServices],
})
export default class taskModule {}
