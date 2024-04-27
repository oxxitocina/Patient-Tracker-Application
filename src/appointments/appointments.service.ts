import { Injectable } from '@nestjs/common'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'
import { Appointment } from './entities/appointment.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}
  async isAppointmentValid(
    appointmentData: Partial<Appointment>,
  ): Promise<boolean> {
    const { startTime, endTime } = appointmentData
    console.log(startTime, endTime)

    // Validate appointment time (8:00 to 16:00)
    const validStartTime = new Date(startTime).getHours() >= 8
    const validEndTime = new Date(endTime).getHours() <= 16
    console.log(validStartTime)
    console.log(validEndTime)

    // Check if the appointment is within 30 days
    const today = new Date()
    const thirtyDaysFromNow = new Date(today)
    thirtyDaysFromNow.setDate(today.getDate() + 30)
    const appointmentDate = new Date(startTime)
    const appointmentDateEnd = new Date(endTime)
    const withinThirtyDays = appointmentDate <= thirtyDaysFromNow
    console.log(appointmentDate)
    console.log(thirtyDaysFromNow)
    console.log(withinThirtyDays)

    // Check availability (assuming you have a list of existing appointments)
    const existingAppointments = await this.appointmentRepository.find()
    const isAvailable = existingAppointments.every((existingAppointment) => {
      const existingStart = new Date(existingAppointment.startTime)
      const existingEnd = new Date(existingAppointment.endTime)
      console.log(existingStart + 'aaaaaaaaaaaaaaaaa')
      console.log(existingEnd + '')
      console.log(appointmentDate + 'bbbbbbbbbbbbbbb')
      console.log(appointmentDateEnd + '')
      return (
        (appointmentDate >= existingEnd ||
          appointmentDateEnd <= existingStart) &&
        (appointmentDate <= existingStart || appointmentDate >= existingEnd)
      )
    })
    console.log(isAvailable)

    return validStartTime && validEndTime && withinThirtyDays && isAvailable
  }
  async create(createAppointmentDto: CreateAppointmentDto) {
    const { startTime, endTime } = createAppointmentDto
    const appointmentAviability = await this.isAppointmentValid({
      startTime,
      endTime,
    })
    console.log(appointmentAviability)
    return this.appointmentRepository.save(createAppointmentDto)
  }

  findAll() {
    return `This action returns all appointments`
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`
  }
}
