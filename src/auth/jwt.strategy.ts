import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload-interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user: User = await UserRepository.findOne({ where: { username } });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
