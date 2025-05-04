import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Logger } from '../logger/logger.service';
export declare class UsersService {
    private userModel;
    private readonly logger;
    constructor(userModel: Model<UserDocument>, logger: Logger);
    create(createUserDto: CreateUserDto): Promise<UserDocument>;
    findByEmail(email: string): Promise<UserDocument>;
    validateUser(email: string, password: string): Promise<UserDocument | null>;
}
