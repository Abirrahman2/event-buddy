import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty({description:"full name of the user",example:"MD MAHMUDUR RAHMAN"})
    fullName:string;
    
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({description:"user email",example:"abirhamza295@gmail.com"})
    email:string;
    @IsString()
    @ApiProperty({description:"this is the user role",example:"user",default:"user"})
    role:string='user';
    @IsNotEmpty()
    @ApiProperty({description:"minimum length of user password should be 8.",example:"12345678"})
    @MinLength(8,{message:'password is too small,minimum length should be 8'})
    password:string;
    
}