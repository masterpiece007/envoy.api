/* eslint-disable prettier/prettier */
import { UserVehicle } from '../user-vehicle.entity';

export class UpdateUserDto {
  //TODO - add validators to the fields
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phoneNumber: string;
  accountNumber: string;
  bankName: string;
  bvn: string;
  userVehicles: UserVehicle[];
}
