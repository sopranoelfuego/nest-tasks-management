import { dataSource } from '../config';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from './tasks.entity';
import { taskStatus } from './tasks.model';
import { SearchFilterTaskDto } from './dtos';

export const TaskRepository = dataSource.getRepository(Task).extend({
  create: async (createTaskDto: CreateTaskDto): Promise<Task> => {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = taskStatus.OPEN;
    await task.save();
    return task;
  },
  find: async (searchFilterTaskDto?: SearchFilterTaskDto): Promise<Task[]> => {
    const { search, status } = searchFilterTaskDto;
    const query = Task.createQueryBuilder('task');
    try {
      if (status) {
        query.andWhere('task.status= :status', { status });
      }
      if (search) {
        query.andWhere(
          'LOWER(task.title) LIKE :search OR  LOWER(task.description) LIKE :search',
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
