import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Patient } from './entities/patient.entity'
import { CreatePatientDto } from './dto/create-patient.dto'
import { UpdatePatientDto } from './dto/update-patient.dto'

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  create(createPatientDto: CreatePatientDto) {
    return this.patientRepository.save(createPatientDto)
  }

  findAll(): Promise<Patient[]> {
    return this.patientRepository.find()
  }

  findOne(patient_id: number): Promise<Patient | null> {
    return this.patientRepository.findOneBy({ patient_id })
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`
  }

  remove(id: number) {
    return `This action removes a #${id} patient`
  }
}
