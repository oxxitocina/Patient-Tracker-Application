import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule'

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name)

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.logger.debug('Called every 30 seconds')
    console.log('crooooon')
  }

  @Interval(10000)
  handleInterval() {
    this.logger.debug('Called every 10 seconds')
  }

  @Timeout(5000)
  handleTimeout() {
    this.logger.debug('Called once after 5 seconds')
    console.log('crooooon')
  }
}
