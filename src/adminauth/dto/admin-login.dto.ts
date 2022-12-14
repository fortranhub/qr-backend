import { IsNotEmpty } from '@nestjs/class-validator';

export class AdminLoginDto {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    password: string
}