import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './ENTITIES/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './DTO/createuser.dto';
import * as bcrypt from 'bcrypt';
import { Subject } from 'rxjs';
import { EmailService } from 'src/email/email.service';
@Injectable()
export class UsersService {

constructor(
    @InjectRepository(User)
    private userRepository:Repository<User>,
    private  emailService:EmailService,
){}
async createUser(userDto:CreateUserDto)
{
    const checkuser=await this.userRepository.findOne({where:{email:userDto.email}});
    if(checkuser)
    {
        throw new BadRequestException('Unable to process request');
    }
    const saltOrRounds = 10;
    const password = userDto.password;
    const hashedPass=await bcrypt.hash(password,saltOrRounds);
    const newUser=this.userRepository.create({
        ...userDto,
        password:hashedPass
    });
    await this.userRepository.save(newUser);
    const welcomeMail={
        recipients:userDto.email,
       subject:'Welcome To Event Buddy',
       html:`<h1>WELCOME MR. ${userDto.fullName}</h1>
         <p>Successfully signed up.Thank you</p>
       `

    };
    try{
      await this.emailService.sendEmail(welcomeMail)
    }
    catch(error)
    {
        console.log(error);
    }
    return {message:'successfully signed up'};

    
  
}
async findByEmail(email:string)
{
    return await this.userRepository.findOne({where:{email}});
}
async findUsers()
{
    return await this.userRepository.find({where:{role:'user'}});
}
}
