import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  sendMail(body: any) {
    console.log(body)
    const message = body.message

    this.mailService.sendMail({
      from: 'noreply',
      to: body.to,
      subject: `Notification`,
      text: message,
    })
  }
}
