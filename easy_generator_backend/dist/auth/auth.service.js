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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const logger_service_1 = require("../logger/logger.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, logger) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.logger = logger;
        this.logger.setContext('AuthService');
    }
    async validateUser(email, password) {
        this.logger.log(`Validating user: ${email}`);
        const user = await this.usersService.validateUser(email, password);
        if (!user) {
            this.logger.warn(`Authentication failed for user: ${email}`);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return user;
    }
    async login(user) {
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
    async signup(createUserDto) {
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        logger_service_1.Logger])
], AuthService);
//# sourceMappingURL=auth.service.js.map