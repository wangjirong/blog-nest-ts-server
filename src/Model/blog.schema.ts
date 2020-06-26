import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Blog extends Document {
  //文章标题
  @Prop({ required: true })
  title: string;

  // 文章简介概述
  @Prop({ required: true })
  desc: string;

  //文章封面
  @Prop()
  cover: Object;

  //  文章发布日期
  @Prop({ default: new Date() })
  date: Date;

  //  作者
  @Prop({ default: '艾瑞' })
  author: string;

  //  类型-是否原创
  @Prop({ default: true })
  delivery: boolean;

  @Prop({ required: true })
  tags: Array<string>;

  //  文章地址url
  @Prop({ required: true })
  context: string;

    //  评论，留言
  @Prop()
  comment: Array<object>;

  @Prop({default:0})
  readCount:number

  // 是否置顶
  @Prop({default:false})
  stick:boolean

}
export const BlogSchema = SchemaFactory.createForClass(Blog);
