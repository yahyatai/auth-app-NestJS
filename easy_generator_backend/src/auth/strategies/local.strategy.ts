import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Logger } from '../../logger/logger.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private readonly logger: Logger,
  ) {
    super({ usernameField: 'email' });
    this.logger.setContext('LocalStrategy');
  }

  async validate(email: string, password: string): Promise<any> {
    this.logger.log(`Validating user credentials for: ${email}`);
    
    try {
      const user = await this.authService.validateUser(email, password);
      return user;
    } catch (error) {
      this.logger.error(`Authentication failed: ${error.message}`, error.stack);
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
