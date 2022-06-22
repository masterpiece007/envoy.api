/* eslint-disable prettier/prettier */
import { Package } from 'src/packages/package.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: 0 })
  stars: number;

  @Column({ nullable: true, default: 0 })
  comment: string;

  @Column({ nullable: true, default: 0 })
  courierComment: string;

  @OneToOne(() => Package)
  @JoinColumn({ name: 'packageId' })
  package: Package;

  @Column({ nullable: false })
  packageId: number;

  @Column({ nullable: false })
  courierId: string;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateModified: Date;
}
//OneToOne relationship with Package
