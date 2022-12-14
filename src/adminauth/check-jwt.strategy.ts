import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Admin } from 'src/admin/entities/admin.entity';

@Injectable()
export class CheckJwtStrategy extends PassportStrategy(Strategy, 'admin-check-jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ADMIN_SECRET_KEY'),
    });
  }

  async validate(payload: Admin) {
    return {
      id: payload.id,
      username: payload.username,
      email: payload.email
    };
  }
}