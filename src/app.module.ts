import { Module } from '@nestjs/common';
import TaskModule from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'soprano',
      password: 'postgres',
      database: 'taskManagement',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
