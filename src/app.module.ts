import { Module } from '@nestjs/common';
import TaskModule from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TaskModule],
})
export class AppModule {}
