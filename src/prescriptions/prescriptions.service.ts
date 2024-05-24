import { Injectable, Query } from '@nestjs/common'
import { CreatePrescriptionDto } from './dto/create-prescription.dto'
import { UpdatePrescriptionDto } from './dto/update-prescription.dto'
import { Prescription } from './entities/prescription.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Doctor } from 'src/doctors/entities/doctor.entity'

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectRepository(Prescription)
    private prescriptionRepository: Repository<Prescription>,
  ) {}
  async create(createPrescriptionDto: CreatePrescriptionDto) {
    const prescription = new Prescription()
    prescription.medication_name = createPrescriptionDto.medication_name
    prescription.dosage = createPrescriptionDto.dosage
    prescription.frequency = createPrescriptionDto.frequency
    prescription.start_date = createPrescriptionDto.start_date
    prescription.end_date = createPrescriptionDto.end_date
    prescription.doctor = createPrescriptionDto.doctor
    prescription.patient = createPrescriptionDto.patient
    return this.prescriptionRepository.save(prescription)
  }

  findAll(params: any) {
    if (params !== null) {
      console.log(params.doctor)
      const id = params.doctor
      return this.prescriptionRepository.find({
        where: {
          doctor: {
            doctor_id: id,
          },
        },
        relations: {
          doctor: true,
          patient: true,
        },
      })
    }
    return this.prescriptionRepository.find({
      relations: {
        doctor: true,
        patient: true,
      },
    })
  }

  async findOne(id: number) {
    const prescription = await this.prescriptionRepository.findOne({
      where: { prescription_id: id },
      relations: {
        doctor: true,
      },
    })
    return prescription
  }

  update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
    return `This action updates a #${id} prescription`
  }

  remove(id: number) {
    return `This action removes a #${id} prescription`
  }
}
