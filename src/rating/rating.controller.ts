import { ApiTags } from '@nestjs/swagger';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dtos/create-rating.dto';
import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/jwt.strategy';

@ApiTags('rating')
@Controller('rating')
export class RatingController {
  constructor(private ratingService: RatingService) {}
  @UseGuards(JwtAuthGuard)
  @Post('submitRating')
  async findTrip(@Body() dto: CreateRatingDto, @Req() req) {
    dto.userId = req.user.userId;
    return await this.ratingService.submitRating(dto);
  }

  //@UseGuards(JwtAuthGuard)
  @Get('getCourierRating/:courierId')
  async getCourierRating(@Param('courierId') courierId: string) {
    //var userId = req.user.userId;
    return await this.ratingService.getCourierRating(courierId);
  }
}
