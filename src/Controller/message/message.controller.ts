import { Message } from './../../Model/message.schema';
import { Request } from 'express';
import { MessageService } from './message.service';
import { Controller, Post, Req, HttpCode, Body, Get } from '@nestjs/common';
import MessageDto from 'src/Dto/message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/leaveMessage')
  @HttpCode(200)
  async leaveMessage(@Body() messageDto: MessageDto): Promise<Message> {
    return await this.messageService.leaveMessage(messageDto);
  }

  @Get('/getAllMessage')
  @HttpCode(200)
  async getAllMessage(): Promise<Array<Message>> {
    return await this.messageService.getAllMessage();
  }
}
