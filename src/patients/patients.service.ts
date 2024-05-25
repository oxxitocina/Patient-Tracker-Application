import { Injectable, NotFoundException } from '@nestjs/common'
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
    return this.patientRepository.find({
      relations: { user: true, prescription_list: true, chats_list: true },
    })
  }

  findOne(patient_id: number): Promise<Patient | null> {
    return this.patientRepository.findOne({
      where: { patient_id: patient_id },
      relations: { user: true, chats_list: true },
    })
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patient = this.patientRepository.findOne({
      where: { patient_id: id },
    })

    if (!patient) throw new NotFoundException('Patient not found')

    return await this.patientRepository.update(id, updatePatientDto)
  }

  remove(id: number) {
    return `This action removes a #${id} patient`
  }
}
