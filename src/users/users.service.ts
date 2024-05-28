import { ConflictException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { PatientsService } from 'src/patients/patients.service'
import { DoctorsService } from 'src/doctors/doctors.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private patientService: PatientsService,
    private doctorService: DoctorsService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto)
    createUserDto.password = await argon2.hash(createUserDto.password)
    const user = await this.usersRepository.save(createUserDto)
    console.log(user)
    if (user?.role === 'patient') {
      await this.patientService.update(user.patient.patient_id, {
        // email: user.username,
        email: 'madishka.kapezov@gmail.com',
        name: user.username,
      })
    }

    if (user?.role === 'doctor') {
      await this.doctorService.update(user.doctor.doctor_id, {
        // email: user.username,
        email: 'madishka.kapezov@gmail.com',
        name: user.username,
      })
    }

    const token = this.jwtService.sign({
      username: user.username,
      sub: user.user_id,
    })

    return { user, token }
  }

  findAll() {
    return `This action returns all users`
  }

  findOne(username: string) {
    const user = this.usersRepository.findOne({
      where: { username },
      relations: {
        doctor: true,
        patient: true,
      },
    })
    if (user) {
      return user
    }
    throw new ConflictException('User not found')
  }

  findOneById(id: number) {
    return this.usersRepository.findOne({
      where: { user_id: id },
      relations: {
        doctor: true,
        patient: true,
      },
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
