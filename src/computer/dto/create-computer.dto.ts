import { IsNotEmpty, MinLength, MaxLength } from '@nestjs/class-validator';
import { Unique } from '../../validation/unique.decorator';
import { Computer } from '../entities/computer.entity';

export class CreateComputerDto {
    @IsNotEmpty()
    user_id: number

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    name: string

    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    @Unique(Computer, 'number')
    number: string

    @IsNotEmpty()
    memory: string;

    @IsNotEmpty()
    processor: string;
    
    @IsNotEmpty()
    disk_capacity:string;
}