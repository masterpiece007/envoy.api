/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserVehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  brand: string; //toyota,honda e.t.c

  @Column({ nullable: false })
  color: string; //toyota,honda e.t.c

  @Column({ nullable: false })
  model: string; // 2003 Crosstour, 2009 Corrolla e.t.c

  @Column({ nullable: false })
  plateNumber: string;

  @Column({ nullable: true })
  vehicleImagePath: string;

  @Column({ nullable: false })
  driverLicenceNumber: string;

  @ManyToOne(() => User, (user) => user.userVehicles)
  @JoinColumn({ name: 'userId' })
  user: User;
  userId: string;
}
