import { MongooseModule } from '@nestjs/mongoose';
import { Module, HttpModule } from '@nestjs/common';
import { User, UserSchema } from '../../Model/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),HttpModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {

}
