import { Module } from '@nestjs/common';
import { DiagnoseController } from './diagnose.controller';;
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Forecast } from 'src/Entities/forecast.entity';
import { ForecastService } from './diagnose.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Forecast, User])
  ],
  controllers: [DiagnoseController],
  providers: [ForecastService, UserService]
})
export class DiagnoseModule {}
