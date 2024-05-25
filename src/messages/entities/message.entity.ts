import { Chat } from 'src/chat/entities/chat.entity'
import { Doctor } from 'src/doctors/entities/doctor.entity'
import { Patient } from 'src/patients/entities/patient.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  message_id: number

  @Column({ nullable: true })
  message: string

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat

  @ManyToOne(() => Doctor, (doctor) => doctor.messages)
  doctor: Doctor

  @ManyToOne(() => Patient, (patient) => patient.messages)
  patient: Patient
}
