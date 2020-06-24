import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  constructor(userName: string, password: string) {
    super();
    this.userName = userName;
    this.password = password;
  }

  @Prop({ required: true })
  userName: string;
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
