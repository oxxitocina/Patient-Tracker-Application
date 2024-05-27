import { Controller, Post, Body } from '@nestjs/common'

import { MailService } from './mail.service'

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  create(@Body() body: any) {
    return this.mailService.sendMail(body)
  }
}
