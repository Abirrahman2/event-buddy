import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from 'src/events/events.module';
import { Booking } from './ENTITES/booking.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Booking]),EventsModule],
  controllers: [BookingController],
  providers: [BookingService]
})
export class BookingModule {}
