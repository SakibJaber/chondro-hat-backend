import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { hash } from 'bcrypt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/utility/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (!existingUser) {
      createUserDto.password = await hash(createUserDto.password, 11);
      // Assign roles from the DTO, or fallback to default if missing
      const userRoles = createUserDto.roles
        ? [createUserDto.roles]
        : [Roles.USER];
      // let user = this.usersRepository.create(createUserDto);
      let user = this.usersRepository.create({
        ...createUserDto,
        roles: userRoles,
      });
      user = await this.usersRepository.save(user);
      delete user.password; // remove_password_from_response
      return user;
    } else {
      throw new BadRequestException('Email is already used');
    }
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  // Login function
  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    // Check if the user exists by email
    const user = await this.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // If email and password match, generate JWT token
    const payload = { email: user.email, roles: user.roles };
    const token = this.jwtService.sign(payload);

    // If email and password match, return the user (without password)

    const { password: _, ...result } = user; // Exclude password from the result
    return {
      access_token: token, // Return the token
      user: result,
    };
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      return user;
    } else {
      throw new NotFoundException('user not found');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
