import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { dataSource } from 'src/config';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

export const UserRepository = dataSource.getRepository(User).extend({
  create: async (createUserDto: CreateUserDto): Promise<void> => {
    const { username, password } = createUserDto;
    try {
      const user = new User();
      user.username = username;
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, salt);
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
  deleteAll: async (): Promise<string> => {
    try {
      await User.delete({});
      return 'successfull deleted';
    } catch (error) {
      throw error;
    }
  },
});
