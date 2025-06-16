import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Headers,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "../services/auth.services";
import { RegisterDto } from "../dto/register.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginDto } from "../dto/login.dto";
import { ResetPasswordDto } from "../dto/resetPassword";
@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return user;
  }
  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    return user;
  }
  @Get('me')
  async getProfile(@Headers('authorization') authHeader: string) {
    const user = await this.authService.getCurrentUser(authHeader);
    return {
      message: 'Current user fetched successfully',
      data: user,
    };
  }
    @Post('verify-email')
  async verifyEmail(@Body() data: { email: string; otp: string }) {
    return this.authService.verifyOtp(data.email, data.otp);
  }
  
  @Post('forgot-password')
  async requestReset(@Body() body: { email: string }) {
    return this.authService.sendResetOtp(body.email);
  }
  
  @Post('reset-password')
  async resetPassword (@Body() resetPassword: ResetPasswordDto) {
    return this.authService.resetPassword(resetPassword)
  }
    @Post('resend')
  async resendOtp(@Body() body: {email: string}) {
    return this.authService.resendOtp(body.email)
  }
  
}
