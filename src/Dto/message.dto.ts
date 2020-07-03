import { User } from './../Model/user.schema';
export default class MessageDto {
  user: User;
  browser: string;
  date: Date;
  text: string;
  replys: Array<Object>;
}
