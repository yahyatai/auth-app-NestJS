import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Logger } from '../logger/logger.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly logger: Logger,
  ) {
    this.logger.setContext('UsersService');
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    this.logger.log(`Creating a new user with email: ${createUserDto.email}`);
    
    const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
    if (existingUser) {
      this.logger.warn(`User with email ${createUserDto.email} already exists`);
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    this.logger.log(`User created with ID: ${savedUser._id}`);
    
    return savedUser;
  }

  async findByEmail(email: string): Promise<UserDocument> {
    this.logger.log(`Finding user by email: ${email}`);
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      this.logger.warn(`User with email ${email} not found`);
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async validateUser(email: string, password: string): Promise<UserDocument | null> {
    try {
      const user = await this.userModel.findOne({ email }).exec();

      if (!user) {
        this.logger.warn(`User with email ${email} not found during validation`);
        return null;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        this.logger.warn(`Invalid password for user ${email}`);
        return null;
      }

      this.logger.log(`User ${email} validated successfully`);
      return user;
    } catch (error) {
      this.logger.error(`Error validating user: ${error.message}`, error.stack);
      return null;
    }
  }
}
