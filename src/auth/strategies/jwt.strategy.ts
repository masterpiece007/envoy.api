/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import config from '../../../.env.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretkeytothekingdomofjwt',
      //secretOrKey: config.JwtSecretKey,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
