import { Module } from "@nestjs/common";
import { UserModuleModule } from "../user-module/user-module.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../../config/constants";
import { AuthService } from "./auth.services";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";


@Module({
  imports: [
    UserModuleModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService:ConfigService)=> ({
        secret: configService.get<string>('JWT_SECRET'),
         signOptions: {
          expiresIn: parseInt(
            configService.getOrThrow<string>(
              'ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC',
            ),
          ),
        },
      }),
      // secret: jwtConstants.secret,
      // signOptions: { expiresIn: "60m" },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController, ],
  providers: [AuthService,LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule]
})
export class AuthModuleModule {}
