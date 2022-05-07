import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { taskStatus } from '../tasks.model';

export class SearchFilterTask {
  @IsNotEmpty()
  @IsString()
  search: string;

  @IsNotEmpty()
  @IsEnum(taskStatus)
  status: taskStatus;
}
