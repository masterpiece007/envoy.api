/* eslint-disable prettier/prettier */
import { AuthService } from './auth.service';
import { Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './strategies/local.strategy';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
    
    @Get('confirmEmail/:userId/:verificationToken')
    confirmEmail(@Param('userId') userId: string,@Param('verificationToken') verificationToken: string) {
      return  this.authService.verifyEmail({userId,verificationToken})
  
    }
}
