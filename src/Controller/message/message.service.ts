import { Message } from './../../Model/message.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import MessageDto from 'src/Dto/message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  async leaveMessage(messageDto: MessageDto): Promise<Message> {
    return await new this.messageModel(messageDto).save();
  }

  async getAllMessage(): Promise<Array<Message>> {
    return await this.messageModel.find();
  }
}
