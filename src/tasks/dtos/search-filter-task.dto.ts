import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { taskStatus } from '../tasks.model';

export class SearchFilterTaskDto {
  @IsOptional()
  search: string;

  @IsEnum(taskStatus)
  @IsOptional()
  status: taskStatus;
}
