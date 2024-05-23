import { User } from 'src/users/entities/user.entity'

export class CreateDoctorDto {
  name: string
  email: string
  password: string
  specialization: string
  experience: string
  description: string
  education: string
  prescription_list: []
  user: User
}
