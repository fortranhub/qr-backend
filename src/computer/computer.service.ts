import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateComputerDto } from './dto/create-computer.dto';
import { Computer } from './entities/computer.entity';

@Injectable()
export class ComputerService {
  constructor(
    @InjectRepository(Computer)
    private computersRepository: Repository<Computer>
  ) { }

  async create({ name, number, user_id, memory, processor, disk_capacity }: CreateComputerDto) {
    let insertData = {
      name,
      user_id,
      number,
      memory,
      processor, 
      disk_capacity
    }

    try {
      this.computersRepository.insert(insertData)
    } catch (error) {
      throw (error)
    }
    return [];
  }

  async findAll(page: number): Promise<[Computer[], number]> {
    page = page || 1;
    let perPage = 5;
    let allList = await this.computersRepository.findAndCount({
      skip: (page - 1) * perPage,
      take: perPage,
    });

    allList.push(perPage)
    return allList
  }

  findOne(number: string): Promise<Computer> {
    return this.computersRepository.findOne({ where : {number}, relations:['user'] });
  }

  remove(id: number) {
    return this.computersRepository.delete(id);
  }
}