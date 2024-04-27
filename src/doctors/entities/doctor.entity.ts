import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Prescription } from 'src/prescriptions/entities/prescription.entity'
import { Appointment } from 'src/appointments/entities/appointment.entity'

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  doctor_id: number

  @Column()
  name: string

  @Column({ nullable: true })
  email: string

  @Column({ nullable: true })
  password: string

  @Column()
  specialization: string

  @Column()
  experience: string

  @Column()
  description: string

  @Column()
  education: string

  @OneToMany(() => Prescription, (Prescription) => Prescription.doctor, {
    cascade: true,
  })
  prescription_list: Prescription[]

  @OneToMany(() => Appointment, (Appointment) => Appointment.doctor, {
    cascade: true,
  })
  appointment_list: Appointment[]
}
