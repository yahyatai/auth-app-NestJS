"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const user_schema_1 = require("./schemas/user.schema");
const logger_service_1 = require("../logger/logger.service");
let UsersService = class UsersService {
    constructor(userModel, logger) {
        this.userModel = userModel;
        this.logger = logger;
        this.logger.setContext('UsersService');
    }
    async create(createUserDto) {
        this.logger.log(`Creating a new user with email: ${createUserDto.email}`);
        const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
        if (existingUser) {
            this.logger.warn(`User with email ${createUserDto.email} already exists`);
            throw new common_1.ConflictException('Email already exists');
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
    async findByEmail(email) {
        this.logger.log(`Finding user by email: ${email}`);
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            this.logger.warn(`User with email ${email} not found`);
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async validateUser(email, password) {
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
        }
        catch (error) {
            this.logger.error(`Error validating user: ${error.message}`, error.stack);
            return null;
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        logger_service_1.Logger])
], UsersService);
//# sourceMappingURL=users.service.js.map