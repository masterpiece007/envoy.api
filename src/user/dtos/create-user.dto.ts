/* eslint-disable prettier/prettier */
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  //TODO - add validators to the fields

  firstname: string;

  lastname: string;

  username: string;

  phoneNumber: string;

  verificationCode: string;

  @IsEmail()
  email: string;
  password: string;
}
