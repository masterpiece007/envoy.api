/* eslint-disable prettier/prettier */
import { User } from './../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Package } from './package.entity';
import { Trip } from 'src/trip/trip.entity';

@Entity()
export class PackageInterest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hasAlternatePlan: boolean;

  @Column()
  isInterested: boolean;

  @Column()
  isAwarded: boolean;

  @Column({ nullable: true })
  proposedPickupType?: string;

  @Column({ nullable: true })
  proposedDeliveryType?: string;

  @Column({ nullable: true })
  proposedPickupDateTime?: Date;

  @Column({ nullable: true, type: 'numeric', precision: 10, scale: 2 })
  proposedAmount?: number;

  @Column({ nullable: true })
  desiredPickupPointOrArea: string;

  @Column({ nullable: true })
  desiredDropPointOrArea: string;

  @CreateDateColumn()
  dateCreated?: Date;

  @UpdateDateColumn()
  dateModified?: Date;

  @ManyToOne(() => Package, (package_) => package_.packageInterests)
  @JoinColumn({ name: 'packageId' })
  package_: Package;

  @Column({ nullable: false })
  packageId: number;

  @ManyToOne(() => User, (user) => user.packageInterests)
  @JoinColumn({ name: 'courierId' })
  courier: User; //foreignkey to user table

  @Column({ nullable: false })
  courierId: string;

  @OneToOne(() => Trip)
  @JoinColumn({ name: 'courierTripId' })
  trip: Trip;

  @Column({ nullable: false })
  courierTripId: number;
}
