import { Body, Controller, Patch, Post, UseGuards,Query, Delete, Get } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventDto } from './DTO/event.dto';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/ROLES-DECORATOR/roles.guard';
import { Roles } from 'src/auth/ROLES-DECORATOR/roles.decorator';
import { updateEvent } from './DTO/updateevent.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
@Controller('events')
export class EventsController {
    constructor(private eventService:EventsService){}
    @Post('/create-event')
    @Roles('admin')
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @ApiBearerAuth('JWT')
    @ApiOperation({summary:"admin can create event"})
    @ApiResponse({status:201,description:"event created successfully"})
    async createEvent(@Body() body:EventDto)
    {
        return await this.eventService.createEvent(body);
    }
    @Patch('/update-event')
    @Roles('admin')
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @ApiBearerAuth('JWT')
    @ApiOperation({summary:"admin can update an event"})
    @ApiResponse({status:201,description:"event created successfully"})
    @ApiBadRequestResponse({description:"bad request or event not found"})
    @ApiQuery({name:"id",description:"eventId"})
    async updateEvent(@Query('id')id:number,@Body() update:updateEvent)
    {
    return await this.eventService.updateEvent(id,update);
    }

    @Delete('delete-event')
    @Roles('admin')
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @ApiBearerAuth('JWT')
    @ApiOperation({summary:"admin only can delete an event"})
    @ApiResponse({status:201,description:"event successfully deleted"})
    @ApiResponse({status:404,description:"event not found"})
    @ApiQuery({name:"id",description:"eventId"})
    async delteEvent(@Query('id')id:number)
    {
        return this.eventService.deletEvent(id);
    }
    @Get('upcoming-event')
    @ApiOperation({summary:"get upcoming event by everyone.Because this is public api"})
    @ApiResponse({status:201,description:"all upcoming events"})
    async upcomingEvent()
    {
        return this.eventService.findUpcoming();
    }
    @Get('previous-event')
    @ApiOperation({summary:"get all previous events and this is also public api."})
    @ApiResponse({status:201,description:"successfully fetch previous events"})
    async previousEvent()
    {
        return this.eventService.findPrevious();
    }
}
