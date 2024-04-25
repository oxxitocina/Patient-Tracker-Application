import { Injectable } from '@nestjs/common'
import { CreateDoctorDto } from './dto/create-doctor.dto'
import { UpdateDoctorDto } from './dto/update-doctor.dto'
import { Repository } from 'typeorm'
import { Doctor } from './entities/doctor.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  create(createDoctorDto: CreateDoctorDto) {
    return this.doctorRepository.save(createDoctorDto)
  }

  findAll() {
    return this.doctorRepository.find()
  }

  findOne(doctor_id: number) {
    return this.doctorRepository.findOneBy({ doctor_id })
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`
  }
}
