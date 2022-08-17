import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import tasksController from './tasks.controller';
import { TasksServices } from './tasks.services';

@Module({
  imports: [AuthModule],
  controllers: [tasksController],
  providers: [TasksServices],
})
export default class taskModule {}
