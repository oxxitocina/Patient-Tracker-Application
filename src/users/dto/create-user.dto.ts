import { IsOptional } from 'class-validator'
import { Doctor } from 'src/doctors/entities/doctor.entity'
import { Patient } from 'src/patients/entities/patient.entity'

export class CreateUserDto {
  username: string
  password: string
  role: 'doctor' | 'patient'
  @IsOptional()
  doctor?: Doctor
  @IsOptional()
  patient?: Patient
}
