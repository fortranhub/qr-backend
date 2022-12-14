import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create({ full_name, email, phone }: CreateUserDto) {
    let insertData = {
      full_name,
      email,
      phone
    }

    try {
      this.usersRepository.insert(insertData)
    } catch (error) {
      throw(error)
    }
    return [];
  }

  async findAll(page: number): Promise<[User[], number]> {
    page = page || 1;
    let perPage = 5;
    let allList = await this.usersRepository.findAndCount({
      skip: (page - 1) * perPage,
      take: perPage,
    });

    allList.push(perPage)
    return allList
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }
  
  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}