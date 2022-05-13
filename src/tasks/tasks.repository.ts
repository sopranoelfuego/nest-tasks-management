import { dataSource } from 'src/config/db';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from './tasks.entity';
import { taskStatus } from './tasks.model';

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
});
