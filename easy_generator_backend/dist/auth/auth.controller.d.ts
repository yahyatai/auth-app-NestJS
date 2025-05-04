import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { Logger } from '../logger/logger.service';
export declare class AuthController {
    private authService;
    private readonly logger;
    constructor(authService: AuthService, logger: Logger);
    signup(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        user: {
            id: any;
            email: string;
            name: string;
        };
    }>;
    login(loginUserDto: LoginUserDto, req: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: string;
            name: string;
        };
    }>;
}
