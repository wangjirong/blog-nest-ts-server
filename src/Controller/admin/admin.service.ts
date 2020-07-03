import bcrypt = require('bcryptjs');
import { Admin } from './../../Model/admin.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import AdminDto from 'src/Dto/admin.dto';
@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
  ) {}

  async findAdminByUserName(userName: string): Promise<Admin | undefined> {
    return await this.adminModel.findOne({ userName });
  }

  async register(adminDto: AdminDto): Promise<Admin | any> {
    const user = await this.findAdminByUserName(adminDto.userName);
    if (user)
      return {
        code: '211',
        msg: '该用户已存在',
      };
    const password = adminDto.password;
    adminDto.password = bcrypt.hashSync(password, 16);
    return new this.adminModel(adminDto).save();
  }

  async login(userName: string, password: string): Promise<Admin | any> {
    return this.validateAdmin(userName, password);
  }

  async validateAdmin(
    userName: string,
    password: string,
  ): Promise<Admin | undefined | any> {
    const admin = await this.findAdminByUserName(userName);
    if (admin && bcrypt.compareSync(password, admin.password)) return admin;
    return null;
  }
}
