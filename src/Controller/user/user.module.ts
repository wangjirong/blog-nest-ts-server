import { JwtService, JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, HttpModule } from '@nestjs/common';
import { User, UserSchema } from '../../Model/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { jwtSecret } from './../../config/admin';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HttpModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: {
        expiresIn: '3600s',
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
