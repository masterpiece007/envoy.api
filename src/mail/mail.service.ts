import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly configSrv: ConfigService,
  ) {}

  async sendUserConfirmation(user: any, token: string) {
    //const url = `http://localhost:3000/auth/confirmEmail/${user.id}/${token}`;
    // eslint-disable-next-line prettier/prettier
    const url = `${this.configSrv.get<string>('BASE_URL')}/auth/confirmEmail/${user.id}/${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Envoy Email Verification',
      template: './mailformat', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.firstname,
        url,
      },
    });
  }
}
