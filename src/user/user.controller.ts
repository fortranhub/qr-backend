import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, UnprocessableEntityException, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService, 
    private readonly configService: ConfigService) { }

  @UseGuards(AuthGuard('admin-check-jwt'))
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    let user = await this.userService.create(createUserDto);
    if(user){
      return {
        message: 'You successfully add a new user.'
      }
    }
    return {
      message: 'Something went wrong'
    }
  }

  @Get()
  findAll(@Query('page') page) {
    return this.userService.findAll(+page);
  }

  @Get('find')
  async findOne(@Query('id') id: string) {
    let data =  await this.userService.findOne(+id);
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
    return this.userService.remove(+id);
  }
}