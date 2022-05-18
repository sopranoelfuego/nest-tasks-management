import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TaskModel } from 'src/tasks/tasks.model';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  async signup(createUserDto: CreateUserDto): Promise<void> {
    return UserRepository.create(createUserDto);
  }
  async getAll(): Promise<User[]> {
    return UserRepository.getAll();
  }
  async deleteAll() {
    return UserRepository.deleteAll();
  }
  async signin(authUserDto: AuthUserDto): Promise<string> {
    const { username, password } = authUserDto;
    const user = await UserRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return 'logged successful..';
    } else throw new UnauthorizedException('error bad credentiels....');
  }
}
