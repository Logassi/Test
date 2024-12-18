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
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly birthday?: string;

  @IsNumber()
  @IsOptional()
  readonly height?: number;

  @IsNumber()
  @IsOptional()
  readonly weight?: number;

  // @IsNotEmpty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly interests: string[];
}
