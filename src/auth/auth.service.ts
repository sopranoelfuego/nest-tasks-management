import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  async signup(createUserDto: CreateUserDto): Promise<void> {
    return UserRepository.create(createUserDto);
  }
  async getAll(): Promise<User[]> {
    return UserRepository.getAll();
  }
}
