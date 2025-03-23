import { IsInt, IsString, IsIn, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateDiagnosisDto {

  @IsInt() @Min(0) @Max(100)
  temperature: number;

  @IsInt() @Min(0) @Max(100)
  humidity: number;

  @IsInt() @Min(0) @Max(100)
  windSpeed: number;

  @IsInt() @Min(0) @Max(100)
  solarRadiation: number;

  @IsNotEmpty()
  @IsInt()
  userId: number; 
}
