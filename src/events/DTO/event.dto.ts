import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString,IsDateString, IsOptional, IsInt, Min } from "class-validator";

export class EventDto{

    @IsNotEmpty()
    @IsString()
     @ApiProperty({description:"This is the title of the event",example:"Tech conference"})
    title:string;
    
    @IsNotEmpty()
    @IsDateString()
     @ApiProperty({description:"Starting Date of the event in ISO format",example:"2025-05-26"})
    date:string;
    

    @IsString()
    @IsOptional()
     @ApiProperty({description:"Time of the event",example:"12:01",required:false})
    time?:string;

    @IsNotEmpty()
    @IsString()
     @ApiProperty({description:"Description of the event",example:"A breif discussiong of NestJS"})
    description:string;

    @IsNotEmpty()
    @IsString()
     @ApiProperty({description:"Location of the event",example:"shonir akhra"})
    location: string;
    @IsNotEmpty()
    @IsInt()
    @Min(4)
     @ApiProperty({description:"number of capacity for an event where minimum capacity we took 4.",example:100,minimum:4})
    capacity:number;
    @IsOptional()
    @IsString()
     @ApiProperty({description:"Tages for the event",example:"conference",required:false})
    tags:string;
    @IsOptional()
    @IsString()
     @ApiProperty({description:"This is image url, we just store the link , but right now this field can be null",example:"http://localhost:3000/image1.png",required:false})
    image:string;

   
}