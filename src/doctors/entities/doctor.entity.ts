import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Prescription } from 'src/prescriptions/entities/prescription.entity'

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  doctor_id: number

  @Column()
  name: string

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
}
