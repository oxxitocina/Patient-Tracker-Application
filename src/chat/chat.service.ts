import { Injectable } from '@nestjs/common'
import { CreateChatDto } from './dto/create-chat.dto'
import { UpdateChatDto } from './dto/update-chat.dto'
import { Chat } from './entities/chat.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}
  create(createChatDto: CreateChatDto) {
    return this.chatRepository.save(createChatDto)
  }

  findAll() {
    return this.chatRepository.find({
      relations: [
        'doctor',
        'patient',
        'messages',
        'messages.patient',
        'messages.doctor',
      ],
    })
  }

  async findAllParams({ doctorID, patientID }) {
    const chat = await this.chatRepository.findOne({
      relations: [
        'doctor',
        'patient',
        'messages',
        'messages.patient',
        'messages.doctor',
      ],
      where: {
        patient: {
          patient_id: patientID,
        },
        doctor: {
          doctor_id: doctorID,
        },
      },
      order: {
        messages: {
          message_id: 'ASC',
        },
      },
    })

    if (!chat) {
      const create = {
        doctor: {
          doctor_id: doctorID,
        },
        patient: {
          patient_id: patientID,
        },
      }
      // @ts-ignore
      await this.create(create)
      return this.findAllParams({ patientID, doctorID })
    }

    return chat
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`
  }

  remove(id: number) {
    return `This action removes a #${id} chat`
  }
}
