import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { taskStatus } from './tasks.model';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: taskStatus;
}