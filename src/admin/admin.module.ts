import { Module } from '@nestjs/common';
import { Admin } from './entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { Computer } from 'src/computer/entities/computer.entity';
import { UserService } from 'src/user/user.service';
import { ComputerService } from 'src/computer/computer.service';
import { AdminService } from './admin.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Admin, User, Computer
    ]),
  ],
  providers: [ AdminService, ConfigService, UserService, ComputerService ],
  exports: [TypeOrmModule]
})
export class AdminModule { }