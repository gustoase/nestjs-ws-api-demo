import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UserDto {
  @IsNumber()
  @Type(() => Number)
  id: number;

  @IsString()
  firstName: string;

  @IsString()
  email: string;
}
