import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Prescription } from 'src/prescriptions/entities/prescription.entity'
import { Appointment } from 'src/appointments/entities/appointment.entity'

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  patient_id: number

  @Column()
  name: string

  @Column()
  age: number

  @Column()
  description: string

  @OneToMany(() => Prescription, (Prescription) => Prescription.patient, {
    cascade: true,
  })
  prescription_list: Prescription[]

  @OneToMany(() => Appointment, (Appointment) => Appointment.patient, {
    cascade: true,
  })
  appointment_list: Appointment[]
}
