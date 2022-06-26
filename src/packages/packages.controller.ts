import { UpdatePackageInterestDto } from './dtos/update-package-interest.dto';
import { PackagesService } from './packages.service';
import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Req,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreatePackageDto } from './dtos/create-package.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreatePackageInterestDto } from './dtos/create-package-interest.dto';
import { JwtAuthGuard } from 'src/auth/strategies/jwt.strategy';
import { CourierChoiceDto } from './dtos/courier-choice.dto';

@ApiTags('package')
@Controller('packages')
export class PackagesController {
  constructor(private packagesService: PackagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('createPackageRequest')
  async createPackage(@Body() package_: CreatePackageDto, @Req() req) {
    console.log('userId: ' + req.user.userId);
    package_.userId = req.user.userId;
    const result = await this.packagesService.createPackageRequest(package_);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('createPackageInterest')
  async createPackageInterest(
    @Body() interest_: CreatePackageInterestDto,
    @Req() req,
  ) {
    interest_.userId = req.user.userId;
    const result = await this.packagesService.CreatePackageInterest(interest_);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('updatePackageInterest')
  async updatePackageInterest(
    @Body() interest_: UpdatePackageInterestDto,
    @Req() req,
  ) {
    interest_.courierId = req.user.userId;
    const result = await this.packagesService.UpdatePackageInterest(interest_);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('toggleCourierAssignmentToPackage')
  async toggleCourierAssignmentToPackage(
    @Body() choice: CourierChoiceDto,
    @Req() req,
  ) {
    const userId = req.user.userId;
    const result = await this.packagesService.ToggleCourierAssignmentToPackage(
      choice,
      userId,
    );
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('getPackageById/:id')
  async GetPackageById(@Param('id') id: number, @Req() req) {
    //const result = await this.packagesService.GetPackageById(id);
    const result = await this.packagesService.GetPackageById_(
      id,
      req.user.userId,
    );
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAllPackages/:userId')
  async GetAllPackages(@Param('userId') userId: string, @Req() req) {
    if (req.user.userId !== userId) {
      return new HttpException(
        `you call only fetch packages that belong to you`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.packagesService.GetAllPackages(userId);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('viewSuggestedPlans/:packageId')
  async ViewSuggestedPlans(@Param('packageId') packageId: number, @Req() req) {
    const result = await this.packagesService.ViewSuggestedPlans(
      packageId,
      req.user.userId,
    );
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('getPackagesForFamiliarRoutes')
  async GetPackagesForFamiliarRoutes(@Req() req) {
    const result = await this.packagesService.GetPackagesForFamiliarRoutes(
      req.user.userId,
    );
    return result;
  }
}
