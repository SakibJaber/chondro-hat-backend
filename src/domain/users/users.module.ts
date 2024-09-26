import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './auth/jwt/jwt.strategy';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('TOKEN_SECRET'), // Getting secret from env
        signOptions: { expiresIn: '1h' }, // Token expiration
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy,RolesGuard, JwtAuthGuard],
  exports: [JwtModule, PassportModule], // Export for use in other modules
})
export class UsersModule {}
