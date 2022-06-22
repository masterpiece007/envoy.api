import { ApiTags } from '@nestjs/swagger';
import { UpdateTripDto } from './dtos/update-trip.dto';
import { CreateTripDto } from './dtos/create-trip.dto';
import { TripService } from './trip.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/jwt.strategy';
import { FindTripDto } from './dtos/find-trip.dto';
import { throwIfEmpty } from 'rxjs';

@ApiTags('trip')
@Controller('trip')
export class TripController {
  constructor(private tripService: TripService) {}

  @UseGuards(JwtAuthGuard)
  @Get('findTrip/:id')
  async findTrip(@Param('id') id: number) {
    return await this.tripService.findTrip(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('findAllTripPlans')
  async findAllTripPlansForCourier(@Body() dto: FindTripDto, @Req() req) {
    const courierId = req.user.userId;
    return await this.tripService.findAllTripPlansForCourier(
      courierId,
      dto.isActive,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('createTripPlan')
  async createTripPlan(@Body() dto: CreateTripDto, @Req() req) {
    if (dto) {
      dto.courierId = req.user.userId;
      return await this.tripService.createTrip(dto);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('updateTripPlan')
  async updateTripPlan(@Body() dto: UpdateTripDto, @Req() req) {
    if (dto) {
      const courierId = req.user.userId;
      return await this.tripService.updateTripPlan(dto, courierId);
    }
    throw new HttpException('empty model provided', HttpStatus.BAD_REQUEST);
  }
}
