import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Headers,
  UseGuards,
  BadRequestException,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
// import { AuthService } from "../services/auth.services";
import { AuthService } from "./auth.services";
import { RegisterDto } from "./register.dto";
// import { RegisterDto } from "../dto/register.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthGuard } from "@nestjs/passport";
// import { LocalAuthGuard } from "../guards/local-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login( @Request() req: any,): Promise<any> {
    // Adjust return type as needed
    // req.user is set by the local strategy
    console.log("Req data in the controlller",req);
    
    return this.authService.login(req.user);
  }
   @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<any> { // Adjust return type as needed
    try {
      return await this.authService.register(registerDto);
    } catch (error:any) {
      throw new BadRequestException(error.message);
    }
  }
}
