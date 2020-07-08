import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  HttpCode,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from '../../Model/user.schema';
import { UserService } from './user.service';
import { UserDto } from '../../Dto/user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('/')
  @HttpCode(200)
  async getAllUser(): Promise<User[]> {
    return await this.userService.getAllUser();
  }

  @Post('/register')
  @HttpCode(200)
  async register(@Body() userDto: UserDto): Promise<User> {
    // return await this.userService.register(userDto);
    return;
  }

  @Get('/qqLogin')
  @HttpCode(200)
  async login(
    @Query('access_token') access_token: string,
    @Res() res: Response,
  ): Promise<any> {
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
        date: new Date(),
      });
    }
    const token = 'Bearer ' + this.jwtService.sign({ ...user });
    res.cookie('token', token, {
      domain: 'cirev.cn',
      maxAge: 1000 * 60 * 60 * 240,
      httpOnly: false,
    });
    res.send(token);
  }
}
