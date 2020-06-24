import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../Model/user.schema';
import { UserDto } from '../../Dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
  }

  async getAllUser(): Promise<User[]> {
    return this.userModel.find();
  }

  async register(userDto: UserDto): Promise<User> {
    return new this.userModel(userDto).save();
  }

  async login(userDto: UserDto): Promise<User> {
    return this.userModel.findOne({ userName: userDto.userName, password: userDto.password });
  }

}
