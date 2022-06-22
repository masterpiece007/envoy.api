import { GenericResponse } from './../generic-response';

import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    //if (user && user.password === pass) {
    if (user && (await argon2.verify(user.password, pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    console.log(user);
    const payload = {
      username: user.username,
      sub: user.id,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verifyEmail(userToken: any): Promise<GenericResponse> {
    return await this.usersService.verifyEmail(userToken);
  }
}
