import { IsEnum } from 'class-validator';
import { taskStatus } from '../tasks.model';

export class UpdateTaskDto {
  @IsEnum(taskStatus)
  status: taskStatus;
}
