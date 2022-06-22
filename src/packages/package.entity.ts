/* eslint-disable prettier/prettier */
import { User } from './../user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { PackageInterest } from './package-interest.entity';
import { Profile, use } from 'passport';
import { Trip } from 'src/trip/trip.entity';

@Entity()
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  currentState: string;

  @Column({ nullable: false })
  currentCityOrArea: string;

  @Column({ nullable: false })
  destinationState: string;

  @Column({ nullable: false })
  destinationCityOrArea: string;

  @Column({ nullable: true })
  desiredPickupPointOrArea: string;

  @Column({ nullable: true })
  desiredDropPointOrArea: string;

  @Column({ nullable: false })
  pickupDateTime: Date;

  @Column({ nullable: false, type: 'numeric', precision: 10, scale: 2 })
  amount: number;

  @Column({ nullable: true })
  deliveryStatus: string;

  @Column()
  pickupType: string;

  @Column()
  deliveryType: string;

  @Column({ nullable: true })
  courierId: string;

  @Column({ nullable: false })
  packageImage: string;

  @Column({ nullable: false })
  recipientName: string;

  @Column({ nullable: false })
  recipientPhoneNumber: string;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateModified: Date;

  @OneToMany(
    () => PackageInterest,
    (packageInterest) => packageInterest.package_,
    { eager: true },
  )
  packageInterests: PackageInterest[];

  @ManyToOne(() => User, (user) => user.packages)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: false })
  userId: string;

  @ManyToOne(() => Trip, (trip) => trip.packages)
  @JoinColumn({ name: 'tripId' })
  trip: Trip;

  @Column({ nullable: true })
  tripId: number;
}
