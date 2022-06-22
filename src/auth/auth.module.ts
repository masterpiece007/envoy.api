/* eslint-disable prettier/prettier */
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import config from '../../.env.config';



@Module({
  imports:[UserModule,  PassportModule,
    JwtModule.register({
      secret: "secretkeytothekingdomofjwt",    
      //secret: config.secret,    
      //secret: process.env.JWT_SECRET,    
      signOptions: { expiresIn: '1h' },
    })
    ],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
