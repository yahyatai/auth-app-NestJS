import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schemas/user.schema';
import { Logger } from '../logger/logger.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private readonly logger;
    constructor(usersService: UsersService, jwtService: JwtService, logger: Logger);
    validateUser(email: string, password: string): Promise<UserDocument>;
    login(user: UserDocument): Promise<{
        access_token: string;
        user: {
            id: any;
            email: string;
            name: string;
        };
    }>;
    signup(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        user: {
            id: any;
            email: string;
            name: string;
        };
    }>;
}
