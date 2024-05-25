import { Chat } from 'src/chat/entities/chat.entity'
import { Doctor } from 'src/doctors/entities/doctor.entity'
import { Patient } from 'src/patients/entities/patient.entity'

export class CreateMessageDto {
  message: string
  chat: Chat
  doctor: Doctor
  patient: Patient
}
