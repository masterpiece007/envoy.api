import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: 'Outlook365',
          host: 'smtp-mail.outlook.com',
          port: 587,
          secure: false,
          requireTLS: false,
          auth: {
            user: configService.get('MAIL_USERNAME'),
            pass: configService.get('MAIL_PASSWORD'),
          },
          logger: true,
          debug: true,
          tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false,
          },
          //ignoreTLS: false,
        },
        defaults: {
          from: '"No Reply" <q.ajagbe@gmail.com>',
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
    }),
    // MailerModule.forRoot({
    //   transport: {
    //     // host: 'smtp.gmail.com',
    //     // secure: true,
    //     // auth: {
    //     //   user: `qfajagbe@gmail.com`,
    //     //   pass: `@ROLLover007`,
    //     // },
    //     // port: 465,

    //     // service: 'ethereal',
    //     // host: 'smtp.ethereal.email',
    //     // port: 587,
    //     // secure: false,
    //     // requireTLS: true,
    //     // auth: {
    //     //   user: 'leta.hahn63@ethereal.email',
    //     //   pass: 'WbwnBnaT6dpfUF5nk8',
    //     // },

    //     service: 'Outlook365',
    //     host: 'smtp-mail.outlook.com',
    //     port: 587,
    //     secure: false,
    //     requireTLS: false,
    //     auth: {
    //       // user: 'q.ajagbe@gmail.com',
    //       // pass: '@ROLLover009',
    //       user: 'q.ajagbe@gmail.com',
    //       pass: '@ROLLover009',
    //     },
    //     logger: true,
    //     debug: true,
    //     tls: {
    //       ciphers: 'SSLv3',
    //       rejectUnauthorized: false,
    //     },
    //     //ignoreTLS: false,
    //   },
    //   defaults: {
    //     from: '"No Reply" <q.ajagbe@gmail.com>',
    //   },
    //   template: {
    //     dir: join(__dirname, 'templates'),
    //     adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
    //     options: {
    //       strict: true,
    //     },
    //   },
    // }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
