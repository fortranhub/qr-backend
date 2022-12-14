import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../admin/entities/admin.entity';
import { ConfigService } from '@nestjs/config';
import { ILogin } from './login.interface';
import { AdminService } from 'src/admin/admin.service';
import { DateHelper } from 'src/helper/date.helper';

@Injectable()
export class AuthService {
    constructor(
        private readonly adminService: AdminService,
        private jwtService: JwtService,
        private config: ConfigService,
    ) { }

    async validateAdmin(username: string, password: string): Promise<any> {
        const admin = await this.adminService.findByUsernameAndEmail(username);

        if (admin && bcrypt.compareSync(password, admin.password)) {
            const { password, ...result } = admin;
            return result;
        }

        return null;
    }

    async login(admin: Admin): Promise<ILogin> {
        const payload = {
            id: admin.id,
            username: admin.username,
            email: admin.email
        };
        console.log(admin)
        return {
            access_token: this.jwtService.sign(payload),
            token_exp_time: DateHelper.setHours(parseInt(this.config.get<string>('JWT_ADMIN_EXPIRE_TIME'))),
            admin: payload
        };
    }
}