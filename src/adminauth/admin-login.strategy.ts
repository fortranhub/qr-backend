import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AdminLoginStrategy extends PassportStrategy(Strategy, 'admin-login') {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const admin = await this.authService.validateAdmin(username, password);

        if (!admin) {
            throw new UnauthorizedException({ message: 'Invalid username or password' });
        }

        return admin;
    }
}