import { Controller, Post, Body, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Logger } from '../logger/logger.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext('AuthController');
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    this.logger.log('Signup request received');
    return this.authService.signup(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto, @Request() req) {
    this.logger.log(`Login request received for: ${loginUserDto.email}`);
    return this.authService.login(req.user);
  }
}