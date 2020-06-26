import { TagDto } from '../../Dto/tag.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from '../../Model/tag.schema';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private readonly tagModel: Model<Tag>) {}

  async addTag(tag: TagDto): Promise<Tag> {
    return await new this.tagModel(tag).save();
  }

  async deleteTag(_id: string, tagName: string): Promise<any> {
    return await this.tagModel.findOneAndDelete({ _id, tagName });
  }

  async getAllTags(): Promise<Array<Tag>> {
    return await this.tagModel.find();
  }
}
