import { IsNotEmpty, IsEmail, MinLength, MaxLength } from '@nestjs/class-validator';
import { IsPhoneNumber } from 'class-validator';
import { Unique } from '../../validation/unique.decorator';
import { User } from '../entities/user.entity';

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    @Unique(User, 'full_name')
    full_name: string

    @IsNotEmpty()
    @IsEmail()
    @Unique(User, 'email')
    email: string

    @IsNotEmpty()
    // @IsPhoneNumber('AM')
    @IsPhoneNumber()
    @Unique(User, 'phone')
    phone: string
}