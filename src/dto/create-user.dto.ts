import { IsDefined, IsEmail, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsNumber()
  @IsDefined()
  @Type(() => Number)
  id: number;

  @IsString()
  @IsDefined()
  firstName: string;

  @IsString()
  @IsEmail()
  @IsDefined()
  email: string;
}
