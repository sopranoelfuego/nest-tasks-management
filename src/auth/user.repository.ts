import { dataSource } from 'src/config';
import { Task } from 'src/tasks/tasks.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

export const UserRepository = dataSource.getRepository(User).extend({
  create: async (createUserDto: CreateUserDto): Promise<User> => {
    const { username, password } = createUserDto;
    try {
      const user = new User();
      user.username = username;
      user.password = password;
      await user.save();
      return user;
    } catch (error) {
      throw new Error(error);
    }
  },
  getAll: async (): Promise<User[]> => {
    try {
      const tasks = await User.find();
      return tasks;
    } catch (error) {
      throw new Error(error);
    }
  },
});
