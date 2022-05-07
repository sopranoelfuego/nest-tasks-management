import { Module } from '@nestjs/common';
import taskModule from './tasks/tasks.module';

@Module({
  imports: [taskModule],
})
export class AppModule {}
