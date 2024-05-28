import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { PrescriptionsModule } from 'src/prescriptions/prescriptions.module'
import { MailModule } from 'src/mail/mail.module'

@Module({
  imports: [PrescriptionsModule, MailModule],
  providers: [TasksService],
})
export class TasksModule {}
