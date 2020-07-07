import { Link } from './../../Model/link.schema';
import { LinkDto } from './../../Dto/link.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LinkService {
  constructor(
    @InjectModel(Link.name) private readonly linkModel: Model<Link>,
  ) {}
  async addLink(linkdto: LinkDto): Promise<Link> {
    return await new this.linkModel(linkdto).save();
  }

  async getAllLinks(): Promise<Array<Link>> {
    return await this.linkModel.find({}).sort({ date: -1 });
  }

  async deleteLink(_id: string): Promise<any> {
    return await this.linkModel.findByIdAndDelete(_id);
  }
}
