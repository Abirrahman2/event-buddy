import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Passport } from 'passport';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './STRATEGY/jwt.strategy';

@Module({
  imports:[UsersModule,ConfigModule.forRoot(),PassportModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:async(ConfigService:ConfigService)=>({
       secret:ConfigService.get<string>('JWT_SECRET_KEY'),
       signOptions:{expiresIn:ConfigService.get<string>('JWT_EXPIRES')},
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy]
})
export class AuthModule {}
