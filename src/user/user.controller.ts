/* eslint-disable prefer-const */
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/strategies/jwt.strategy';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  async createPackage(@Body() userDto: CreateUserDto) {
    let result = await this.userService.createUser(userDto);
    return result;
  }

  //@ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('updateProfile')
  async updateProfile(@Req() req, @Body() userDto: UpdateUserDto) {
    let result = await this.userService.updateProfile(req.user.userId, userDto);
    return result;
  }
  @UseGuards(JwtAuthGuard)
  @Post('getProfile')
  async getProfile(@Req() req) {
    let userId: string = req.user.userId;
    let result = await this.userService.getProfile(userId);
    return result;
  }

  //verifyEmail
}
