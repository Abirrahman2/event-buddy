import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, MoreThan, Repository, UpdateEvent } from 'typeorm';
import { Events } from './ENTITIES/event.entity';
import { EventDto } from './DTO/event.dto';
import { updateEvent } from './DTO/updateevent.dto'; 
@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Events)
        private eventRepo:Repository<Events>,
    ){}

    async createEvent(eventDto:EventDto)
    {
        //console.log(eventDto);
       const eventDate=new Date(eventDto.date);
        if(eventDate<=new Date())
        {
            throw new BadRequestException('DATE IS ALREADY PASSED');
        }
        const event=await this.eventRepo.create({
            ...eventDto,
            date:eventDate,
            remaining:eventDto.capacity,
        });
        return await this.eventRepo.save(event);
    }
    async findIndividual(id:number)
    {
        const event=await this.eventRepo.findOne({where:{id}});
        if(!event)
        {
            throw new NotFoundException('Event is not found');
        }
        return event;
    }
    async findUpcoming():Promise<Events[]>
    {
        return await this.eventRepo.find({
            where:{date:MoreThan(new Date())},
        
        });
    }
    async findPrevious():Promise<Events[]>
    {
        return await this.eventRepo.find({
            where:{date:LessThan(new Date())},
        });
    }
    async updateEvent(id:number,updateEventDto:updateEvent)
    {
      const event=await this.eventRepo.findOne({where:{id}});
      
      if(!event)
      {
        throw new BadRequestException('there is no such an event');
      }
      if(updateEventDto.date!=null)
      {
        const newDate=new Date(updateEventDto.date);
        if(newDate<=new Date())
        {
            throw new BadRequestException('updated date is less than current date');
        }
    }
        if( updateEventDto.capacity!=undefined && updateEventDto.capacity <event?.capacity-event.remaining)
        {
             throw new BadRequestException('trying to reduce the capacity which is less than booked seats');
        }
        if(updateEventDto.capacity!=undefined)
        {
            event.remaining=updateEventDto.capacity-(event.capacity-event.remaining);
        }
        const updated= await this.eventRepo.merge(event,{
            ...updateEventDto,
            date:updateEventDto.date?new Date(updateEventDto.date):event.date,
        });
      
       
      
       return await this.eventRepo.save(updated);
     
    }
    async deletEvent(id:number)
    {
        const ans=await this.eventRepo.delete(id);
        if(ans.affected===0)
        {
            throw new NotFoundException('Event is not found');
        }
    }
    async capacityReduce(eventId:number,seats:number)
    {
        await this.eventRepo.decrement({id:eventId},'remaining',seats);
    }
    async capacityIncreament(eventId:number,seats:number)
    {
        await this.eventRepo.increment({id:eventId},'remaining',seats);
    }
}
