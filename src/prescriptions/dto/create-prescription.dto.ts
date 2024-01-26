import { IsString } from 'class-validator'
import { Patient } from 'src/patients/entities/patient.entity'
import { Doctor } from 'src/doctors/entities/doctor.entity'

export class CreatePrescriptionDto {
  @IsString()
  medication_name: string

  @IsString()
  dosage: string

  patient: Patient

  doctor: Doctor

  @IsString()
  frequency: string

  start_date: string

  end_date: string
}
