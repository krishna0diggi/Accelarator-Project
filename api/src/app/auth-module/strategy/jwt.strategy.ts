// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// // import { ConfigService } from '@nestjs/config';
// import { jwtConstants } from '../../../config/constants';



// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: jwtConstants.secret || 'Secret-key'
//     });
//   }

//   async validate(payload: JwtPayload) {
//     return {
//       id: payload.sub,
//       email: payload.email,
//       name: payload.name,
//     };
//   }
// }
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
// import { ConfigService } from '@nestjs/config';
import { jwtConstants } from '../../../config/constants';
// import { AccessTokenPayload } from '../types/AccessTokenPayload';

export interface AccessTokenPayload {
  sub: number;
  email: string;
  name: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret || 'Secret-key'
    });
  }

  async validate(payload: AccessTokenPayload) {
    console.log("Validating..... with JWT");
    
    return payload;
  }
}



