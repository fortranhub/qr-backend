import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../admin/entities/admin.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminLoginStrategy } from './admin-login.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { CheckJwtStrategy } from './check-jwt.strategy';
import { Computer } from 'src/computer/entities/computer.entity';
import { User } from 'src/user/entities/user.entity';
import { AdminService } from 'src/admin/admin.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_ADMIN_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_ADMIN_EXPIRE_TIME },
    }),
    TypeOrmModule.forFeature([
      Admin, User, Computer
    ]),
    PassportModule
  ],
  providers: [AuthService, AdminService, AdminLoginStrategy, CheckJwtStrategy],
  controllers: [AuthController]
})
export class AdminAuthModule { }