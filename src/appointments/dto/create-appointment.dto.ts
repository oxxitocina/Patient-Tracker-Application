import { IsInt, Min } from 'class-validator'
import { Doctor } from 'src/doctors/entities/doctor.entity'
import { Patient } from 'src/patients/entities/patient.entity'

export class CreateAppointmentDto {
  startTime: string // Example: "2024-04-30T10:00:00"

  endTime: string // Example: "2024-04-30T11:00:00"

  @IsInt()
  @Min(1)
  patient: Patient // Example: 123

  @IsInt()
  @Min(1)
  doctor: Doctor // Example: 456
}
