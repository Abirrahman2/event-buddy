import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor()
    {

        super({
         jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration:false,
         secretOrKey:'iamsoMuchConfused3000@',
        });
    }
    async validate(payload:any) 
    {
      return {userId:payload.sub,email:payload.email,role:payload.role};
    }
}