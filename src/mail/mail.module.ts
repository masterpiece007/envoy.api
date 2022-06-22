import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
          user: `qfajagbe@gmail.com`,
          pass: `@ROLLover007`,
        },
        port: 465,
        logger: true,
        debug: true,
        ignoreTLS: true,
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
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

// import { MailerModule } from '@nestjs-modules/mailer';
// import { Module } from '@nestjs/common';
// import { join } from 'path';
// import { MailService } from './mail.service';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// import { ConfigService } from '@nestjs/config';

// @Module({
//     imports: [

//       //TODO - research and use .env to hide config parameters

//         MailerModule.forRootAsync({
//           useFactory: async (config: ConfigService) => ({
//         transport: {
//             host: 'smtp.gmail.com',
//             secure: true,
//             auth: {
//               user: `${config.get("MAIL_USERNAME")}`,
//               pass: `${config.get("MAIL_PASSWORD")}`,
//             },
//             port: 465,
//             logger:true,
//             debug: true,
//             ignoreTLS: true
//           }
//           ,
//           defaults: {
//             from: '"No Reply" <q.ajagbe@gmail.com>',
//           },
//           template: {
//             dir: join(__dirname, 'templates'),
//             adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
//             options: {
//               strict: true,
//             },
//           },
//         })
//         ,
//         inject: [ConfigService]
//       })
//         ,
//       ],
//   providers: [MailService],
//   exports:[MailService]

// })
// export class MailModule {}
