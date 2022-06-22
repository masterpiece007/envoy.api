/* eslint-disable prettier/prettier */
import { Package } from './../packages/package.entity';
import { UserVehicle } from './user-vehicle.entity';
//import { AccountDetails } from './account-details.entity';
import { PackageInterest } from './../packages/package-interest.entity';
//import { IsEmail } from "class-validator/types/decorator/decorators";
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as argon2 from 'argon2';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  firstname: string;

  @Column('text')
  lastname: string;

  @Column('text')
  username: string;

  @Column('text')
  phoneNumber: string;

  //@Column("text",{select: false})
  @Column('text')
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @Column({ nullable: true })
  verificationCode: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ nullable: true, default: 'noemail@envoy.com' })
  email: string;

  @Column({ default: false })
  hasVehicle: boolean;

  @OneToMany(() => UserVehicle, (userVehicle) => userVehicle.user)
  userVehicles: UserVehicle[];

  @Column('text', { nullable: true })
  accountNumber: string;

  @Column('text', { nullable: true })
  bankName: string;

  @Column('text', { nullable: true })
  bvn: string;

  @Column({ default: false })
  isBvnVerified: boolean;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateModified: Date;

  @OneToMany(() => Package, (package_) => package_.user)
  packages: Package[];

  @OneToMany(
    () => PackageInterest,
    (packageInterest) => packageInterest.courier,
  )
  packageInterests: PackageInterest[];

  // @OneToOne(() => AccountDetails)
  // @JoinColumn({name:"accountDetailsId"})
  // AccountDetails: AccountDetails;
  // accountDetailsId: number
}
