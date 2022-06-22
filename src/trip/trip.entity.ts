/* eslint-disable prettier/prettier */
import { Package } from 'src/packages/package.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  currentState: string;

  @Column({ type: 'text', nullable: false })
  currentCity: string;

  @Column({ type: 'text', nullable: false })
  desiredStartingPoint_Area: string;

  @Column({ nullable: false })
  nextTravelDate: Date;

  @Column({ type: 'text', nullable: false })
  travelType: string;

  @Column({ type: 'text', nullable: false })
  recurrentType: string;

  @Column({ type: 'text', default: false })
  hasPackageForThisTrip: boolean;

  @Column({ type: 'text', nullable: false })
  destinationState: string;

  @Column({ type: 'text', nullable: false })
  destinationCity: string;

  @Column({ type: 'text', nullable: false })
  likelyDropPointOrBusStopArea: string;

  @Column({ nullable: false })
  isActive: boolean;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateModified: Date;

  @OneToMany(() => Package, (package_) => package_.trip)
  packages: Package[];

  @ManyToOne(() => User, (user) => user.packages)
  @JoinColumn({ name: 'courierId' })
  courier: User;

  @Column({ nullable: false })
  courierId: string;
}
/*
CurrentState, CurrentCity, CurrentArea(Likely/DesiredStartingPoint/MotorPark_Area), NextTravelDate, TravelType(Recurrent, OneOffTrip/Impromptu), RecurrentType(None,Weekly,Monthly,Bi-Weekly,Bi-Monthly,FestivePeriod), HasPackageForThisTrip, DestinationState, DestinationCity, LikelyDropPoint/Area/BusStop

=> One User can have many TravelPlans
=> One TravelPlan can have many packages

*/
