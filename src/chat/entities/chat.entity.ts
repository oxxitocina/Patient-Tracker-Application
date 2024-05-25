import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Message } from 'src/messages/entities/message.entity'
import { Doctor } from 'src/doctors/entities/doctor.entity'
import { Patient } from 'src/patients/entities/patient.entity'

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @CreateDateColumn()
  createdAt: Date

  @OneToMany(() => Message, (message) => message.chat, { cascade: true })
  messages: Message[]

  @ManyToOne(() => Doctor, (Doctor) => Doctor.chats_list)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor

  @ManyToOne(() => Patient, (patient) => patient.chats_list)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient
}
