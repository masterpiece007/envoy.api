import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PackagesModule } from './packages/packages.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { TripModule } from './trip/trip.module';
import { RatingModule } from './rating/rating.module';
import { PaymentModule } from './payment/payment.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    PackagesModule,
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot(),
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TripModule,
    RatingModule,
    PaymentModule,
    HttpModule.register({ timeout: 10000 }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
