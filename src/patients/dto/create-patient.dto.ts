import { User } from 'src/users/entities/user.entity'

export class CreatePatientDto {
  name?: string
  age?: number
  description?: string
  prescription_list?: []
  user?: User
}
