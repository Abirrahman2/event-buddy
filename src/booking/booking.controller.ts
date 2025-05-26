import { Body, Controller, Post, UseGuards,Req, Get } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Roles } from 'src/auth/ROLES-DECORATOR/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/ROLES-DECORATOR/roles.guard';
import { BookingDto } from './DTO/booking.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
@Controller('booking')
@UseGuards(AuthGuard('jwt'),RolesGuard)
export class BookingController {
    constructor(private bookingService:BookingService){}
    @Post('/booking-event')
    @Roles('user')
    @ApiBearerAuth('JWT')
    @ApiOperation({summary:"user only book event"})
    @ApiResponse({status:201,description:"Booking created"})
    @ApiResponse({status:404,description:"event not found"})
    async createEvent(@Body() body:BookingDto,@Req() req)
    {
      const userId=req.user.userId;
     
      return await this.bookingService.createBookingByUser(userId,body);
    }
    @Get('all-bookings')
    @Roles('user')
    @ApiBearerAuth('JWT')
    @ApiOperation({summary:"user can see all the bookings he made"})
    @ApiResponse({status:200,description:"all the booking events by user"})
    async findAllBookings(@Req() req)
    {
        const userId=req.user.userId;
        return await this.bookingService.individualBookins(userId);
    }
}
