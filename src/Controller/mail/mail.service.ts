import { mailSTMPHost, mailSubject } from './../../config/mail';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async senMail(email: string): Promise<string> {
    const code = this.getRandomCode(8);
    const res = await this.mailerService.sendMail({
      to:email,
      from:mailSTMPHost,
      subject:mailSubject,
      text:code,

    })
    console.log(res);
    
    return code;
  }

  getRandomCode(count: number): string {
    const letter = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];
    let code = '';
    for (let i = 0; i < count; i++) {
      code += letter[Math.floor(Math.random() * 36)];
    }
    return code;
  }
}
