/* eslint-disable prettier/prettier */

import { Strategy } from 'passport-local';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private jwtService: JwtService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async login(user: any) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    const payload = {
      username: user.username,
      sub: user.userId,
      email: user.email,
      exp: exp.getTime() / 1000
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') { }