import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Prescription } from 'src/prescriptions/entities/prescription.entity'
import { Appointment } from 'src/appointments/entities/appointment.entity'
import { User } from 'src/users/entities/user.entity'

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  patient_id: number

  @Column({ nullable: true })
  name: string

  @Column({ nullable: true })
  age: number

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  email: string

  @OneToMany(() => Prescription, (Prescription) => Prescription.patient, {
    cascade: true,
  })
  prescription_list: Prescription[]

  @OneToMany(() => Appointment, (Appointment) => Appointment.patient, {
    cascade: true,
  })
  appointment_list: Appointment[]

  @OneToOne(() => User, (user) => user.patient)
  user: User
}
