import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './ENTITIES/users.entity';
import { EmailModule } from 'src/email/email.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports:[TypeOrmModule.forFeature([User]),EmailModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
