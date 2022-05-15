import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { dataSource } from 'src/config';
import { Task } from 'src/tasks/tasks.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

export const UserRepository = dataSource.getRepository(User).extend({
  create: async (createUserDto: CreateUserDto): Promise<void> => {
    const { username, password } = createUserDto;
    try {
      const user = new User();
      user.username = username;
      user.password = password;
      await user.save();
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException('diplicated username');
      else throw new InternalServerErrorException();
    }
  },
  getAll: async (): Promise<User[]> => {
    try {
      const tasks = await User.find();
      return tasks;
    } catch (error) {
      throw new Error(error.code);
    }
  },
});
