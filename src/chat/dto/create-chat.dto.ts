import { Doctor } from 'src/doctors/entities/doctor.entity'
import { Message } from 'src/messages/entities/message.entity'
import { Patient } from 'src/patients/entities/patient.entity'

export class CreateChatDto {
  createdAt: Date
  message: Message
  doctor: Doctor
  patient: Patient
}
