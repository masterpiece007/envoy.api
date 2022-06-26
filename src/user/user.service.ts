/* eslint-disable no-var */
import { MailService } from './../mail/mail.service';
import { GenericResponse, _Status } from './../generic-response';
import { User } from './user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserProfileDto } from './dtos/user-profile.dto';
import { use } from 'passport';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private _userRepo: Repository<User>,
    private mailService: MailService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<any> {
    let savedUser: User;
    try {
      var token = this.generateRandomAlphaNumeric(8);
      dto.verificationCode = token;
      var newUser = this._userRepo.create(dto);
      savedUser = await this._userRepo.save(newUser);

      if (dto.email) {
        var user_: any = {
          email: dto.email,
          firstname: dto.firstname,
          id: savedUser.id,
        };
        //TODO: fix email sender
        await this.mailService.sendUserConfirmation(user_, token);
      }
      return user_;
    } catch (error) {
      if (!savedUser) {
        throw new HttpException(
          `unable to create user: ${error}`,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        `an error occured after saving the user: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getProfile(userId: string): Promise<GenericResponse> {
    try {
      //var user = await this._userRepo.findOne({ id: userId });
      var user = await this.findOne(userId);
      if (user) {
        //TODO - ENDPOINT STILL RETURNING PASSWORDHASH AND VERIFICATION CODE
        var userProfile: UserProfileDto = user as UserProfileDto;
        var response: GenericResponse = {
          Status: _Status.Success,
          Description: 'user profile fetched.',
          Data: userProfile,
        };

        return response;
      }
      var response: GenericResponse = {
        Status: _Status.Failed,
        Description: 'user profile not found.',
        Data: null,
      };
    } catch (error) {
      throw new HttpException(
        `an error occured: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateProfile(
    userId: string,
    userDto: UpdateUserDto,
  ): Promise<GenericResponse> {
    try {
      var user = await this.findOne(userId);
      if (user) {
        //TODO - exclude arrays from the loop
        for (var propName in userDto) {
          if (
            userDto[propName] !== null &&
            userDto[propName] !== undefined &&
            userDto[propName] !== ''
          ) {
            //delete obj[propName];
            user[propName] = userDto[propName];
            console.log('propName: ', userDto[propName]);
          }
        }

        await this._userRepo.save(user);
        var response: GenericResponse = {
          Status: _Status.Success,
          Description: 'user profile updated.',
          Data: userDto,
        };
        return response;
      }
      var response: GenericResponse = {
        Status: _Status.Failed,
        Description: 'user profile not found.',
        Data: null,
      };
    } catch (error) {
      throw new HttpException(
        `an error occured: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(_id: string): Promise<User> {
    try {
      var user = await this._userRepo.findOne({ id: _id });
      return user;
    } catch (error) {
      throw new HttpException(
        `unable to find user: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByUsername(username_: string): Promise<User> {
    try {
      var user = await this._userRepo.findOne({ username: username_ });
      return user;
    } catch (error) {
      throw new HttpException(
        `unable to find user: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async verifyEmail(userToken: any): Promise<GenericResponse> {
    try {
      var user = await this._userRepo.findOne({
        id: userToken.userId,
        verificationCode: userToken.verificationToken,
      });
      if (user) {
        user.isEmailVerified = true;
        this._userRepo.save(user);
        var response: GenericResponse = {
          Status: _Status.Success,
          Description: 'email verified successfully.',
        };
        return response;
      }
      var response: GenericResponse = {
        Status: _Status.Failed,
        Description:
          'unable to verify email. click on resend emailconfirmation ',
        Data: null,
      };
    } catch (error) {}
  }

  generateRandomAlphaNumeric(length) {
    var result = '';
    var chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
}
