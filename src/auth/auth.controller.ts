import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('user')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  async getAll() {}
}
