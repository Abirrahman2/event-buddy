import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './DTO/checkemail.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('email')
export class EmailController {
    constructor(private emailService:EmailService){}
    @Post('send-email')
    @ApiOperation({summary:"we can send email to a user after user successfully singing up in this system."})
    async sendEmail(@Body() emailDto:SendEmailDto)
    {
        await this.emailService.sendEmail(emailDto);
        return {message:'email sent successfully'};
    }

}


