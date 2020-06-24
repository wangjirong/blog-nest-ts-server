import { Controller, Get, Post, Req, Body } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../../Model/user.schema';
import { UserService } from './user.service';
import { UserDto } from '../../Dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get('/')
  async getAllUser(): Promise<User []> {
    console.log(await this.userService.getAllUser());
    return await this.userService.getAllUser();
  }

  @Post('/register')
  async register(@Body() userDto: UserDto): Promise<User> {
    return await this.userService.register(userDto);
  }

  @Post('/login')
  login(@Body() userDto: UserDto): boolean {
    const res = this.userService.login(userDto);
    return true;
  }
}
