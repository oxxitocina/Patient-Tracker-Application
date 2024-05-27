import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { AppointmentsModule } from 'src/appointments/appointments.module'

@Module({
  imports: [AppointmentsModule],
  providers: [TasksService],
})
export class TasksModule {}
