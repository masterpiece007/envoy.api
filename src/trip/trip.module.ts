import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trip])],
  providers: [TripService],
  controllers: [TripController],
  exports: [TripService],
})
export class TripModule {}
