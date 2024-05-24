import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateDoctorDto } from './dto/create-doctor.dto'
import { UpdateDoctorDto } from './dto/update-doctor.dto'
import { Repository } from 'typeorm'
import { Doctor } from './entities/doctor.entity'
import { InjectRepository } from '@nestjs/typeorm'
import * as argon2 from 'argon2'

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    createDoctorDto.password = await argon2.hash(createDoctorDto.password)
    return this.doctorRepository.save(createDoctorDto)
  }

  findAll() {
    return this.doctorRepository.find()
  }

  findOne(email: string) {
    return this.doctorRepository.findOne({
      where: { email },
      relations: { user: true },
    })
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const patient = this.doctorRepository.findOne({
      where: { doctor_id: id },
    })

    if (!patient) throw new NotFoundException('Patient not found')

    return await this.doctorRepository.update(id, updateDoctorDto)
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`
  }
}
