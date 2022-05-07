import { Module } from '@nestjs/common';
import tasksController from './tasks.controller';
import { TasksServices } from './tasks.services';

@Module({
  controllers: [tasksController],
  providers: [TasksServices],
})
export default class taskModule {}
