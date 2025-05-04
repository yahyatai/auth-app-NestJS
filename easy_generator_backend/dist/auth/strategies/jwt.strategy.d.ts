import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { Logger } from '../../logger/logger.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private usersService;
    private readonly logger;
    constructor(configService: ConfigService, usersService: UsersService, logger: Logger);
    validate(payload: any): Promise<{
        userId: any;
        email: any;
        name: any;
    }>;
}
export {};
