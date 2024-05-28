import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { MailService } from 'src/mail/mail.service'
import { PrescriptionsService } from 'src/prescriptions/prescriptions.service'

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name)
  constructor(
    private readonly prescriptionService: PrescriptionsService,
    private readonly mailService: MailService,
  ) {}

  @Cron('0 * * * *')
  async handleCron() {
    this.logger.debug('0 - minute, then hour, day, month')
    const prescriptions = await this.prescriptionService.findAll({})
    prescriptions.forEach((prescription) => {
      if (this.prescriptionService.validatePrescription(prescription)) {
        if (prescription?.patient?.email) {
          return this.mailService.sendMail({
            message: 'It is time to take the pills',
            to: prescription.patient.email,
          })
        }
      }
    })
  }
}
