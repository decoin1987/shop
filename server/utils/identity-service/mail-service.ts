import { createTransport } from 'nodemailer'
import { createError } from 'h3';


let host: any, port: any, user: any, pass: any;
({MAIL_HOST: host, MAIL_PORT: port, SMTP_USER: user, SMTP_PASS: pass} = process.env);

export default new class MailService {
  transporter: any

  constructor () {

    this.transporter = createTransport({
      host,
      port,
      secure: true,
      auth: {
        user,
        pass,
      }
    })
  }

  async sendActivationMail (to: any, link: any) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: 'Активация аккаунта',
        text: '',
        html:
            `<div>
                    <h2>Для активации перейдите по ссылке:</h2>
                    <a href="${link}">${link}</a>
                </div>`
      }, (err: any, res: any) => {
        if (err) {
          console.log(err);
        } else {

        }
      })
    } catch (e) {
      throw createError({
        status: 400,
        message: 'Ошибка отправки письма'
      })
    }
  }
}()
