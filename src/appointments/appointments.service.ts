import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { UpdateAppointmentDto } from './dto/update-appointment.dto'
import { Appointment } from './entities/appointment.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Not, Repository } from 'typeorm'
import * as dayjs from 'dayjs'
import * as LocalizedFormat from 'dayjs/plugin/LocalizedFormat'

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}
  async isAppointmentValid(appointmentData): Promise<boolean> {
    const { startTime, endTime } = appointmentData

    // Validate appointment time (8:00 to 16:00)
    const validStartTime = new Date(startTime).getHours() >= 8
    const validEndTime = new Date(endTime).getHours() <= 16

    // Check if the appointment is within 30 days
    const today = new Date()
    const thirtyDaysFromNow = new Date(today)
    thirtyDaysFromNow.setDate(today.getDate() + 30)
    const appointmentDate = new Date(startTime)
    const appointmentDateEnd = new Date(endTime)
    const withinThirtyDays = appointmentDate <= thirtyDaysFromNow

    dayjs.extend(LocalizedFormat)
    const stringToDateStart = dayjs(startTime).format()
    const stringToDateEnd = dayjs(endTime).format()

    // Check availability (assuming you have a list of existing appointments)
    const existingAppointments = await this.appointmentRepository.find({
      where: {
        startTime: Not(stringToDateStart),
        endTime: Not(stringToDateEnd),
      },
    })
    const isAvailable = existingAppointments.every((existingAppointment) => {
      const existingStart = new Date(existingAppointment.startTime)
      const existingEnd = new Date(existingAppointment.endTime)

      return (
        (appointmentDate >= existingEnd ||
          appointmentDateEnd <= existingStart) &&
        (appointmentDate <= existingStart || appointmentDate >= existingEnd)
      )
    })

    return validStartTime && validEndTime && withinThirtyDays && isAvailable
  }
  async create(createAppointmentDto: CreateAppointmentDto) {
    const { startTime, endTime } = createAppointmentDto
    dayjs.extend(LocalizedFormat)
    const normalizeStartTime = dayjs(startTime).format('L LT')
    const normalizeEndTime = dayjs(endTime).format('L LT')

    const stringToDateStart = dayjs(normalizeStartTime).format()
    const stringToDateEnd = dayjs(normalizeEndTime).format()

    const appointmentData = {
      startTime: stringToDateStart,
      endTime: stringToDateEnd,
    }

    const appointmentAviability = await this.isAppointmentValid(appointmentData)
    if (appointmentAviability) {
      return this.appointmentRepository.save(createAppointmentDto)
    }
    throw new ConflictException('Busy on this time')
  }

  findAll() {
    return this.appointmentRepository.find({
      relations: {
        doctor: true,
        patient: true,
      },
    })
  }

  findAllDoctors(params: any) {
    return this.appointmentRepository.find({
      relations: {
        doctor: true,
        patient: true,
      },
      where: {
        doctor: {
          doctor_id: params.doctor,
        },
      },
    })
  }

  findAllPatients(params: any) {
    return this.appointmentRepository.find({
      relations: {
        doctor: true,
        patient: true,
      },
      where: {
        patient: {
          patient_id: params.patient,
        },
      },
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const patient = this.appointmentRepository.findOne({
      where: { appointment_id: id },
    })

    if (!patient) throw new NotFoundException('Patient not found')

    const { startTime, endTime } = updateAppointmentDto
    dayjs.extend(LocalizedFormat)
    const normalizeStartTime = dayjs(startTime).format('L LT')
    const normalizeEndTime = dayjs(endTime).format('L LT')
    console.log(normalizeStartTime)
    console.log(normalizeEndTime)
    const stringToDateStart = dayjs(normalizeStartTime).format()
    const stringToDateEnd = dayjs(normalizeEndTime).format()

    const appointmentData = {
      startTime: stringToDateStart,
      endTime: stringToDateEnd,
    }

    const appointmentAviability = await this.isAppointmentValid(appointmentData)
    if (appointmentAviability) {
      return await this.appointmentRepository.update(id, updateAppointmentDto)
    }

    throw new ConflictException('Busy on this time')
  }

  async remove(id: number) {
    const appointment = await this.appointmentRepository.findOne({
      where: { appointment_id: id },
    })

    if (!appointment) throw new NotFoundException('User not found')

    return await this.appointmentRepository.delete(id)
  }
}
