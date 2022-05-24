import { dataSource } from '../config';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from './tasks.entity';
import { taskStatus } from './tasks.model';
import { SearchFilterTaskDto } from './dtos';
import { User } from 'src/auth/user.entity';

export const TaskRepository = dataSource.getRepository(Task).extend({
  create: async (createTaskDto: CreateTaskDto, user: User): Promise<Task> => {
    const { title, description } = createTaskDto;
    try {
      const task = new Task();
      task.title = title;
      task.description = description;
      task.status = taskStatus.OPEN;
      task.user = user;
      task.userId = user.id;
      await task.save();
      return task;
    } catch (error) {
      throw new error();
    }
  },
  find: async (
    searchFilterTaskDto: SearchFilterTaskDto,
    user: User,
  ): Promise<Task[]> => {
    const { search, status } = searchFilterTaskDto;
    try {
      const query = Task.createQueryBuilder('task');
      query.where({ user });
      if (status) {
        query.andWhere('task.status = :status', { status });
      }
      if (search) {
        query.andWhere(
          '(LOWER(task.title) LIKE :search OR  LOWER(task.description) LIKE :search)',
          { search: `%${search.toLocaleLowerCase()}%` },
        );
      }
      let tasks = await query.execute();

      return tasks;
    } catch (error) {
      throw new Error(error);
    }
  },
});
