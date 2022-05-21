import { Task } from 'src/tasks/tasks.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;

  @OneToMany((type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
