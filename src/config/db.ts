import { Task } from 'src/tasks/tasks.entity';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'soprano',
  password: 'postgres',
  database: 'taskManagement',
  entities: [Task],
  synchronize: true,
});

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
