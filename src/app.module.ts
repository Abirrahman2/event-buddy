import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/ENTITIES/users.entity';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { Events } from './events/ENTITIES/event.entity';
import { BookingModule } from './booking/booking.module';
import { Booking } from './booking/ENTITES/booking.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'eventbuddy',
      entities: [User,Booking,Events],
      synchronize: true,
    }),UsersModule, EmailModule,ConfigModule.forRoot({isGlobal:true}), AuthModule, EventsModule, BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
