import { PackagesModule } from './../packages/packages.module';
import { Rating } from './rating.entity';
import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [PackagesModule, TypeOrmModule.forFeature([Rating])],
  providers: [RatingService],
  controllers: [RatingController],
})
export class RatingModule {}
