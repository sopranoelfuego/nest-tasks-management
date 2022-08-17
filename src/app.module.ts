import { Module } from '@nestjs/common';
import TaskModule from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [TaskModule, AuthModule],
})
export class AppModule {}
