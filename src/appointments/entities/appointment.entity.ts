import {
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  Entity,
} from 'typeorm'
import { Doctor } from 'src/doctors/entities/doctor.entity'
import { Patient } from 'src/patients/entities/patient.entity'

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  appointment_id: number

  @Column({ type: 'timestamp' })
  startTime: Date

  @Column({ type: 'timestamp' })
  endTime: Date

  @ManyToOne(() => Doctor, (Doctor) => Doctor.appointment_list)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor

  @ManyToOne(() => Patient, (Patient) => Patient.appointment_list)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient
}
