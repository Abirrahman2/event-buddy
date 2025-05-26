import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './DTO/createuser.dto';
import { Roles } from 'src/auth/ROLES-DECORATOR/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/ROLES-DECORATOR/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
@Controller('users')
export class UsersController {

    constructor(private usersService:UsersService){}
    @Post('/sign-up')
    @ApiOperation({summary:"here use can sign up by providing necessary information"})
    @ApiResponse({status:201,description:"user created successfulle and sent an email to that user"})
    async createUser(@Body() body:CreateUserDto)
    {
      return await this.usersService.createUser(body)
    }
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles('admin')
    @Get('/all-users')
    @ApiBearerAuth('JWT')
    @ApiOperation({summary:"we can get all the users. Admin only can do that.Used Role-based Authorization"})
    @ApiResponse({status:201,description:"all users"})
    async findUsers()
    {
      return await this.usersService.findUsers();
    }
    
}
