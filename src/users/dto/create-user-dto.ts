import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

// From my understanding, Schema is a guideline on how each field of the database should look like
// While DTO is a guideline for how frontend/backend using postman, sending a request

export class CreateUserDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  readonly email: string;

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

  // @IsNotEmpty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly interests: string[];
}
