import { Controller, Post, Body, UsePipes, Get, ParseIntPipe, Param, UseGuards } from '@nestjs/common';
import { CreateDiagnosisDto } from './diagnosis-dto/create-diagnosis.dto';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth-guard';
import { ForecastService } from './diagnose.service';


@Controller('forecast')
export class DiagnoseController {
  constructor(private readonly forecastService: ForecastService) {}

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async getForecastByUser(@Param('userId', ParseIntPipe) userId: number){
    return this.forecastService.getForecastByUserId(userId);
  }

  // @UsePipes(UserExistsPipe)
  @Post()
  async createForecast(@Body() createDiagnosisDto: CreateDiagnosisDto) {
    return this.forecastService.createDiagnosis(createDiagnosisDto);
  }
}
