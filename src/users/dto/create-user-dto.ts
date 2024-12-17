import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly birthday: string;

  @IsNumber()
  @IsNotEmpty()
  readonly height: number;

  @IsNumber()
  @IsNotEmpty()
  readonly weight: number;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly interests: string[];
}
