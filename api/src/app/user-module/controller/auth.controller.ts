import { Body, Controller, Get, Param, Post, Headers, } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "../services/auth.services";
import { RegisterDto } from "../dto/register.dto";
import { InjectRepository } from "@nestjs/typeorm";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}
    @Post('register')
    async register( @Body() registerDto: RegisterDto) {
        const user = await this.authService.register(registerDto)
        return user;
    }
}