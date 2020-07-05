import { InvitationCode } from './../../config/mail';
import { MailService } from './../mail/mail.service';
import bcrypt = require('bcryptjs');
import { Admin } from './../../Model/admin.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import AdminDto from 'src/Dto/admin.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async findAdminByUserName(userName: string): Promise<Admin | undefined> {
    return await this.adminModel.findOne({ userName });
  }

  async register(
    adminDto: AdminDto,
    invitationCode: string,
  ): Promise<Admin | any> {
    if (invitationCode !== InvitationCode)
      return {
        code: 233,
        msg: '邀请码错误',
      };
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

  async getVerificationCode(email: string): Promise<string> {
    return this.mailService.senMail(email);
  }

  async login(userName: string, password: string): Promise<Admin | any> {
    const admin = await this.validateAdmin(userName, password);
    if (admin) {
      const payload = {
        userName: admin.userName,
        avatar: admin.avatar,
        email: admin.email,
        phone: admin.phone,
      };
      const token = 'Bearer ' + this.jwtService.sign(payload);
      return token;
    }
    return null;
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
