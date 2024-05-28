import { Injectable, NotFoundException } from '@nestjs/common'
import { CreatePrescriptionDto } from './dto/create-prescription.dto'
import { UpdatePrescriptionDto } from './dto/update-prescription.dto'
import { Prescription } from './entities/prescription.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import * as moment from 'moment'

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
      if (params.doctor) {
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
      if (params.patient) {
        const id = params.patient
        return this.prescriptionRepository.find({
          where: {
            patient: {
              patient_id: id,
            },
          },
          relations: {
            doctor: true,
            patient: true,
          },
        })
      }
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

  async update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
    const prescription = this.prescriptionRepository.findOne({
      where: { prescription_id: id },
    })

    if (!prescription) throw new NotFoundException('prescription not found')
    return await this.prescriptionRepository.update(id, updatePrescriptionDto)
  }

  async remove(id: number) {
    const prescription = await this.prescriptionRepository.findOne({
      where: { prescription_id: id },
    })

    if (!prescription) throw new NotFoundException('User not found')

    return await this.prescriptionRepository.delete(id)
  }

  validatePrescription(prescription: Prescription): boolean {
    const now = moment(new Date()).format()
    const currentTimeSlot = this.getTimeSlot(moment(now).format())

    const startDate = moment(prescription.start_date, 'MM/DD/YYYY').format()

    const endDate = moment(prescription.end_date, 'MM/DD/YYYY').format()

    const isWithinDateRange = now >= startDate && now <= endDate
    const isValidTimeSlot = currentTimeSlot <= Number(prescription.frequency)

    return isWithinDateRange && isValidTimeSlot
  }

  private getTimeSlot(date: string): number {
    const hours = moment(date).hours()
    const minutes = moment(date).minutes()

    if (hours === 8 && minutes === 0) {
      return 1
    } else if (hours === 14 && minutes === 0) {
      return 2
    } else if (hours === 20 && minutes === 0) {
      return 3
    } else {
      return 999
    }
  }
}
