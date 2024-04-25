import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Patient } from 'src/patients/entities/patient.entity'
import { Doctor } from 'src/doctors/entities/doctor.entity'

@Entity()
export class Prescription {
  @PrimaryGeneratedColumn()
  prescription_id: number

  @ManyToOne(() => Patient, (Patient) => Patient.prescription_list)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient

  @ManyToOne(() => Doctor, (Doctor) => Doctor.prescription_list)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor

  @Column()
  medication_name: string

  @Column()
  dosage: string

  @Column()
  frequency: string

  @Column()
  start_date: string

  @Column()
  end_date: string
  // prescription: { doctor_id: number }
}
