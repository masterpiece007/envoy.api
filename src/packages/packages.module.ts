import { TripModule } from './../trip/trip.module';
import { UserModule } from './../user/user.module';
import { UserService } from './../user/user.service';
import { PackageInterest } from './package-interest.entity';
import { Package } from './package.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Package, PackageInterest]),
    UserModule,
    TripModule,
  ],
  providers: [PackagesService],
  controllers: [PackagesController],
  exports: [PackagesService],
})
export class PackagesModule {}
