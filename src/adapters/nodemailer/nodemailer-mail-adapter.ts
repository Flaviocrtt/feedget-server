import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7264032860253d",
      pass: "927e13718b8bd3"
    }
  });

export class NodemailerMailAdapter implements MailAdapter{
   async sendMail({subject, body}:SendMailData): Promise<void> {

    await transport.sendMail({
        from:'Fidget<automatic@fidget.com>',
        to: 'Flavio C<flavio777crtt@hotmail.com>',
        subject,
        html:body
    })
       
   }

}

// [
//     `<div style="font-size: 16px; color: #111">`,
//         `<p>tipo: ${type}</p>`,
//         `<p>comentario: ${comment}</p>`,
// `</div>`,
// ].join('')