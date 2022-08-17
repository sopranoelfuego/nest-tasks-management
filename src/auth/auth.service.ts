import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TaskModel } from '../tasks/tasks.model';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload-interface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async signup(createUserDto: CreateUserDto): Promise<void> {
    return UserRepository.create(createUserDto);
  }
  async getAll(): Promise<User[]> {
    return UserRepository.getAll();
  }
  async deleteAll() {
    return UserRepository.deleteAll();
  }
  async signin(authUserDto: AuthUserDto): Promise<{ accessToken: string }> {
    const { username, password } = authUserDto;
    const user = await UserRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const jwtPayload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(jwtPayload);
      return { accessToken };
    } else throw new UnauthorizedException('wrong usernaname or password....');
  }
}
