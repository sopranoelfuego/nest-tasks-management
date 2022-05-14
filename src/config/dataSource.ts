import { Task } from 'src/tasks/tasks.entity';
import { DataSource } from 'typeorm';
import * as config from 'config';

export const dataSource = new DataSource({
  type: process.env.TYPE,
  host: process.env.HOST,
  port: process.env.PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [Task],
  synchronize: true,
});

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!and env data here:');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
