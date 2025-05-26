import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './ENTITES/booking.entity';
import { Repository } from 'typeorm';
import { EventsService } from 'src/events/events.service';
import { BookingDto } from './DTO/booking.dto';

@Injectable()
export class BookingService {

    constructor(
        @InjectRepository(Booking)
        private bookingRepo:Repository<Booking>,
        private eventsService:EventsService,
    ){}
    async createBookingByUser(userId:number,bookingDto:BookingDto)
    {
      //console.log(userId);
      const event=await this.eventsService.findIndividual(bookingDto.eventId);
      //console.log(event.id);
      if(event==null)
      {
       throw new NotFoundException('Event not found with this');
      }
      const eventDate=new Date(event.date);
      const eventTime=event.time.split(':');
      eventDate.setHours(
        parseInt(eventTime[0],10),
        parseInt(eventTime[1],10),
        0,
        0,
      );
      if(eventDate<=new Date())
      {
        throw new BadRequestException('this event already finished');
      }
      if(event.remaining<bookingDto.bookingSeats)
      {
        throw new BadRequestException('There is not enough remaining seats');
      }
      const eventExist=await this.bookingRepo.findOne({where:{userId,eventId:event.id}});
      if(eventExist)
      {
        console.log(bookingDto.eventId);
        const updateSeat=eventExist.totalSeate+bookingDto.bookingSeats;
        if(updateSeat>4)
        {
            throw new BadRequestException('You can not book more than four seats');
        }
        eventExist.totalSeate=updateSeat;
        await this.eventsService.capacityReduce(event.id,bookingDto.bookingSeats);
        try
        {
            
           return await this.bookingRepo.save(eventExist);
        }
        catch(error)
        {
          await this.eventsService.capacityIncreament(event.id,bookingDto.bookingSeats);
          throw error;
        }
      }
      else
      {
        if(bookingDto.bookingSeats>4)
        {
            throw new BadRequestException('the number seats is more than four');
        }

        await this.eventsService.capacityReduce(event.id,bookingDto.bookingSeats);
        const newBook=await this.bookingRepo.create({
            ...bookingDto,
            userId,
            eventId:event.id,
            totalSeate:bookingDto.bookingSeats,
        });
        try
        {
            return await this.bookingRepo.save(newBook);
        }
        catch(error)
        {
            await this.eventsService.capacityIncreament(event.id,bookingDto.bookingSeats);
            throw error;
        }

      }
    }
    async individualBookins(userId:number)
    {
        return await this.bookingRepo.find({where:{userId},relations:['event']});
    }

}
