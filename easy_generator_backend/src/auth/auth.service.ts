import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schemas/user.schema';
import { Logger } from '../logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext('AuthService');
  }

  async validateUser(email: string, password: string): Promise<UserDocument> {
    this.logger.log(`Validating user: ${email}`);
    const user = await this.usersService.validateUser(email, password);

    if (!user) {
      this.logger.warn(`Authentication failed for user: ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(user: UserDocument) {
    this.logger.log(`Generating JWT token for user: ${user.email}`);

    const payload = {
      email: user.email,
      sub: user._id.toString(),
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
    };
  }

  async signup(createUserDto: CreateUserDto) {
    this.logger.log(`Signing up new user: ${createUserDto.email}`);

    const user = await this.usersService.create(createUserDto);

    const payload = {
      email: user.email,
      sub: user._id.toString(),
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      },
    };
  }
}
