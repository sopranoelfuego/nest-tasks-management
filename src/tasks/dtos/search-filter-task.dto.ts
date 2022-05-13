import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { taskStatus } from '../tasks.model';

export class SearchFilterTaskDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  search: string;

  @IsNotEmpty()
  @IsEnum(taskStatus)
  @IsOptional()
  status: taskStatus;
}
