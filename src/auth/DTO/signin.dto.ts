import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class SignInDto{
    
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({description:"EMAIL ADDRESS",example:"abirhamza295@gmail.com"})
    email:string;
    @IsNotEmpty()
    @ApiProperty({description:"PASSWORD",example:"12345678"})
    password:string;
    
}