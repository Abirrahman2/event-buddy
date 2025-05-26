import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class BookingDto{
    @IsNotEmpty()
    @IsInt()
    @ApiProperty({description:"event id which we will pass through body",example:4})
    eventId:number;
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(4)
    @ApiProperty({description:"number of seats to book, here 1 to 4 seats can booked but not more than that.",example:2,minimum:1,maximum:4})
    bookingSeats:number;
}