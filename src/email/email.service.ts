import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendEmailDto } from './DTO/checkemail.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    constructor(private configService:ConfigService){}
    emailTransporter()
    {
        const transporter=nodemailer.createTransport({
        host: this.configService.get<string>('EMAIL_HOST'),
        port:Number(this.configService.get<string>('EMAIL_PORT')),
        secure:false,
        auth:{
            user:this.configService.get<string>('EMAIL_USER'),
            pass:this.configService.get<string>('EMAIL_PASSWORD'),
        },

        });
        return transporter;
    }
    async sendEmail(emailDto:SendEmailDto)
    {
        const transporter=this.emailTransporter();
        const mailOptions:nodemailer.SendMailOptions={
            from:this.configService.get<string>('EMAIL_USER'),
                to:emailDto.recipients,
                subject:emailDto.subject,
                html:emailDto.html,
        };
        try{
            await transporter.sendMail(mailOptions);

        }
        catch(error)
        {
         console.log(error);
        }
        
        
    }
}
