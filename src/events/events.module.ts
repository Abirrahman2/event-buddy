import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Events } from './ENTITIES/event.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Events])],
  controllers: [EventsController],
  providers: [EventsService],
  exports:[EventsService]
})
export class EventsModule {}
