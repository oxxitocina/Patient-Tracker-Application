import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Prescription } from 'src/prescriptions/entities/prescription.entity'
import { Appointment } from 'src/appointments/entities/appointment.entity'
import { User } from 'src/users/entities/user.entity'
import { Chat } from 'src/chat/entities/chat.entity'
import { Message } from 'src/messages/entities/message.entity'

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  doctor_id: number

  @Column({ nullable: true })
  name: string

  @Column({ nullable: true })
  email: string

  @Column({ nullable: true })
  password: string

  @Column({ nullable: true })
  specialization: string

  @Column({ nullable: true })
  experience: string

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  education: string

  @OneToMany(() => Prescription, (Prescription) => Prescription.doctor, {
    cascade: true,
  })
  prescription_list: Prescription[]

  @OneToMany(() => Appointment, (Appointment) => Appointment.doctor, {
    cascade: true,
  })
  appointment_list: Appointment[]

  @OneToOne(() => User, (User) => User.doctor)
  user: User

  @OneToMany(() => Chat, (chat) => chat.doctor, {
    cascade: true,
  })
  chats_list: Chat[]

  @OneToMany(() => Message, (message) => message.doctor, {
    cascade: true,
  })
  messages: Message[]
}
