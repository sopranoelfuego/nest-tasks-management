import { IsEnum } from 'class-validator';
import { taskStatus } from '../tasks.model';

export class UpdateTask {
  @IsEnum(taskStatus)
  status: taskStatus;
}
