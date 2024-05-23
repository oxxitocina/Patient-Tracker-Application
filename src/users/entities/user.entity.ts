import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Doctor } from 'src/doctors/entities/doctor.entity'
import { Patient } from 'src/patients/entities/patient.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number

  @Column({ nullable: true })
  username: string

  @Column({ nullable: true })
  password: string

  @Column({ nullable: true })
  role: 'doctor' | 'patient'

  @OneToOne(() => Doctor, (doctor) => doctor.user, { cascade: true })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor

  @OneToOne(() => Patient, (patient) => patient.user, { cascade: true })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient
}
