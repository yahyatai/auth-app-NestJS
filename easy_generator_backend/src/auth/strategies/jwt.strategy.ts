import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { Logger } from '../../logger/logger.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private readonly logger: Logger,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
    this.logger.setContext('JwtStrategy');
  }

  async validate(payload: any) {
    this.logger.log(`Validating JWT for user: ${payload.email}`);
    
    try {
      const user = await this.usersService.findByEmail(payload.email);
      
      if (!user) {
        this.logger.warn(`User from JWT not found: ${payload.email}`);
        throw new UnauthorizedException('User not found');
      }
      
      return { userId: payload.sub, email: payload.email, name: payload.name };
    } catch (error) {
      this.logger.error(`JWT validation failed: ${error.message}`, error.stack);
      throw new UnauthorizedException('Invalid token');
    }
  }
}