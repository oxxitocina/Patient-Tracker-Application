import { Injectable } from '@nestjs/common'
import { CreatePrescriptionDto } from './dto/create-prescription.dto'
import { UpdatePrescriptionDto } from './dto/update-prescription.dto'
import { Prescription } from './entities/prescription.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectRepository(Prescription)
    private prescriptionRepository: Repository<Prescription>,
  ) {}
  create(createPrescriptionDto: CreatePrescriptionDto) {
    const newPrescription = {
      
    }
    return this.prescriptionRepository.save(createPrescriptionDto)
  }

  findAll() {
    return `This action returns all prescriptions`
  }

  findOne(id: number) {
    return `This action returns a #${id} prescription`
  }

  update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
    return `This action updates a #${id} prescription`
  }

  remove(id: number) {
    return `This action removes a #${id} prescription`
  }
}
