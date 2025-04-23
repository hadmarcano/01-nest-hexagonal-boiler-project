import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
  MinLength,
} from 'class-validator';

export class AddressDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  street?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  number: number;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;
}
