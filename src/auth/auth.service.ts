import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

    constructor(
        private usersService:UsersService,
        private jwtService:JwtService
    ){}
    async validUser(email:string,password:string)
    {
        const user=await this.usersService.findByEmail(email);
        if(user && await bcrypt.compare(password,user.password))
        {
            const {password,...result}=user;
            return result;
        }
        return null;
    }
    async login(user:any)
    {
        const payload={email:user.email,sub:user.id,role:user.role};
        const token=this.jwtService.sign(payload);
        return{

            access_token:token,
            role:user.role
        };
    }
}
