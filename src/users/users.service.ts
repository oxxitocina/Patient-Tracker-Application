import { Injectable } from '@nestjs/common'
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
    return this.usersRepository.findOne({ where: { username } })
  }

  findOneById(id: number) {
    return this.usersRepository.findOne({ where: { user_id: id } })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
