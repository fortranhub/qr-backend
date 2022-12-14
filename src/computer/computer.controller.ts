import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, UnprocessableEntityException, Query } from '@nestjs/common';
import { ComputerService } from './computer.service';
import { CreateComputerDto } from './dto/create-computer.dto';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Controller('computer')
export class ComputerController {
  constructor(
    private readonly computerService: ComputerService, 
    private readonly userService: UserService, 
    private readonly configService: ConfigService
    ) { }

  @UseGuards(AuthGuard('admin-check-jwt'))
  @Post()
  async create(@Body() createComputerDto: CreateComputerDto) {
    let user = this.userService.findOne(createComputerDto.user_id)
    if(!user){
      return {
        message: 'Something get wrong'
      }
    }
    this.computerService.create(createComputerDto);

    return {
      message: 'You successfully add a new computer.'
    }
  }

  @Get()
  findAll(@Query('page') page) {
    return this.computerService.findAll(+page);
  }

  @Get("find")
  async findOne(@Query('number') number: string) {
    let data =  await this.computerService.findOne(number);
    if(!data){
      return {
        message: `Can't find computer with that id`
      }
    }
    console.log(data)
    return data
  }

  @UseGuards(AuthGuard('admin-check-jwt'))
  @Delete(":id")
  delete(@Param('id') id: string) {
    return this.computerService.remove(+id);
  }
}