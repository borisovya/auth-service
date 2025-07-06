import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!, // гарантируем строку
    });
  }

  // validate() вызывается автоматически при успешной проверке токена
  validate(payload: JwtPayload): { userId: string; email: string; role: string } {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
