import {
    IsString,
    IsDecimal,
    IsInt,
    IsArray,
    ArrayNotEmpty,
    IsOptional,
    IsNumber,
    IsPositive,
  } from 'class-validator';
  
  export class CreateProductDto {
    @IsString()
    title: string;
  
    @IsString()
    description: string;
  
    @IsNumber({}, { message: 'Price must be a valid number' })
    @IsPositive({ message: 'Price must be a positive number' })
    price: number;
  
    @IsInt()
    stock: number;
  
    @IsArray({ message: 'Images must be an array' })
    @ArrayNotEmpty({ message: 'At least one image is required' })
    image: string[];
  
    @IsOptional()
    categoryId: number;
  }
  