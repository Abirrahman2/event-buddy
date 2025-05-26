import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SendEmailDto{

    @IsEmail()
    @ApiProperty({description:"This is the recipent email",example:"abirahman5454@gmail.com"})
     recipients:string;

     @IsString()
      @ApiProperty({description:"This is the subject line",example:"For signed up"})
     subject:string;

     @IsString()
     @ApiProperty({description:"html content",example:"<p>thank you for signing up</p>"})
     html:string;



}