import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  async getAll(): Promise<User[]> {
    return this.authService.getAll();
  }
  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
  @Post('/signin')
  async signin(@Body() authUserDto: AuthUserDto): Promise<string> {
    return this.authService.signin(authUserDto);
  }
  @Delete()
  async deleteMany(): Promise<string> {
    return this.authService.deleteAll();
  }
}
