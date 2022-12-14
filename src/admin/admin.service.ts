import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import { Computer } from 'src/computer/entities/computer.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminsRepository: Repository<Admin>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Computer)
    private computersRepository: Repository<Computer>,
    
  ) { }

  findByUsernameAndEmail(username: string): Promise<Admin> {
    return this.adminsRepository.findOne(
      {
        where: [
          { username },
          { email: username }
        ]
      });
  }
}