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
exports.Logger = void 0;
const common_1 = require("@nestjs/common");
const winston = require("winston");
let Logger = class Logger extends common_1.ConsoleLogger {
    constructor() {
        super();
        this.winstonLogger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.printf(({ timestamp, level, message, context }) => {
                        return `${timestamp} [${context || 'Application'}] ${level}: ${message}`;
                    })),
                }),
                new winston.transports.File({ filename: 'error.log', level: 'error' }),
                new winston.transports.File({ filename: 'combined.log' }),
            ],
        });
    }
    log(message, context) {
        this.winstonLogger.info(message, { context });
        super.log(message, context);
    }
    error(message, trace, context) {
        this.winstonLogger.error(message, { trace, context });
        super.error(message, trace, context);
    }
    warn(message, context) {
        this.winstonLogger.warn(message, { context });
        super.warn(message, context);
    }
    debug(message, context) {
        this.winstonLogger.debug(message, { context });
        super.debug(message, context);
    }
    verbose(message, context) {
        this.winstonLogger.verbose(message, { context });
        super.verbose(message, context);
    }
};
exports.Logger = Logger;
exports.Logger = Logger = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], Logger);
//# sourceMappingURL=logger.service.js.map