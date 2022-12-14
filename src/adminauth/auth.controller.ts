import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ILogin } from './login.interface';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(AuthGuard('admin-login'))
  @Post('admin/login')
  adminLogin(@Request() req): Promise<ILogin> {
    return this.authService.login(req.user)
  }

  @UseGuards(AuthGuard('admin-check-jwt'))
  @Get('auth/admin')
  authAdmin(@Request() req) {
    return req.user
  }

  @Post('admin/login')
  adminAdmin() {
  }
}