import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../Model/user.schema';
import { UserDto } from '../../Dto/user.dto';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly httpService: HttpService,
  ) {}

  async getAllUser(): Promise<User[]> {
    return this.userModel.find().sort({ date: -1 });
  }

  async findUserByOpenID(openID: string): Promise<User> {
    return await this.userModel.findOne({ openID });
  }

  async login(userDto: UserDto): Promise<User> {
    return this.userModel.findOne(userDto);
  }

  async Register(userDto: UserDto): Promise<User> {
    return await new this.userModel(userDto).save();
  }

  getOpenId(access_token: string): Observable<AxiosResponse<any>> {
    return this.httpService.get(
      `https://graph.qq.com/oauth2.0/me?access_token=${access_token}`,
    );
  }

  getUserInfo(
    access_token: string,
    openID: String,
  ): Observable<AxiosResponse<any>> {
    return this.httpService.get(
      `https://graph.qq.com/user/get_user_info?access_token=${access_token}&oauth_consumer_key=101862127&openid=${openID}`,
    );
  }
}
