import { Request } from 'express';
import { Admin } from './../../Model/admin.schema';
import { AdminService } from './admin.service';
import { Controller, Post, HttpCode, Body, Req } from '@nestjs/common';
import AdminDto from 'src/Dto/admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/register')
  @HttpCode(200)
  async register(@Body() adminDto: AdminDto): Promise<Admin | any> {
    return this.adminService.register(adminDto);
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Req() req: Request): Promise<Admin> {
    const { userName, password } = req.body;
    return await this.adminService.login(userName, password);
  }
}
