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
export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly name?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly birthday?: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  readonly height?: number;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  readonly weight?: number;

  // @IsNotEmpty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  readonly interests: string[];
}
