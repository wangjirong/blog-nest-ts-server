import { Observable } from 'rxjs';
import { Controller, Get, Post, Req, Body, Query } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../../Model/user.schema';
import { UserService } from './user.service';
import { UserDto } from '../../Dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getAllUser(): Promise<User[]> {
    return await this.userService.getAllUser();
  }

  @Post('/register')
  async register(@Body() userDto: UserDto): Promise<User> {
    // return await this.userService.register(userDto);
    return;
  }

  @Get('/qqLogin')
  async login(@Query('access_token') access_token: string): Promise<any> {
    const observable = this.userService.getOpenId(access_token);
    const { data } = await observable.toPromise();
    const regx = /\"openid\"\:\"([0-9a-zA-Z]+)\"/;
    data.match(regx);
    const openID = RegExp.$1;
    let user = await this.userService.findUserByOpenID(openID);
    if (!user) {
      const ob = this.userService.getUserInfo(access_token, openID);
      const info = await (await ob.toPromise()).data;
      const { nickname, figureurl_1 } = info;
      user = await this.userService.Register({
        openID,
        nickName: nickname,
        avatar: figureurl_1,
      });
    }
    return user;
  }
}
