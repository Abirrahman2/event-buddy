
import { Body, Controller, Post, HttpCode, HttpStatus, BadRequestException, Req, Res, InternalServerErrorException,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './DTO/signin.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiBadGatewayResponse, ApiBadRequestResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
 @ApiOperation({summary:"user can log in by providing credentials.Here we used JWT token.After log in user will get a jwt token."})
 @ApiResponse({status:201,description:"successfully login"})
 @ApiBadRequestResponse({description:"Invalid user credentials"})
  @Post('login')
  async logIn(@Body() signInDto:SignInDto,@Req() request:Request) {
    const user=await this.authService.validUser(signInDto.email,signInDto.password);
    
    if(!user)
    {
        throw new BadRequestException('invalid credentials');
    }
    const created=await this.authService.login(user);
    
    return created;
  }
  @ApiOperation({summary:"currently unable to logut"})
 @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
   
    
  }
}
