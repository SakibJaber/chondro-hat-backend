import { IsEmail, IsEnum, IsNotEmpty, IsString, min, MinLength } from 'class-validator';
import { Roles } from 'src/utility/roles.enum';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name can not be null' })
  @IsString({ message: 'Name should be string' })
  name: string;

  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @IsString({ message: 'Password should be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsEnum(Roles, { message: 'Invalid role' })
  roles: Roles;  // Ensure it expects Roles enum
}
