import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { ChatService } from './chat.service'
import { CreateChatDto } from './dto/create-chat.dto'
import { UpdateChatDto } from './dto/update-chat.dto'

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto)
  }

  @Get()
  findAll(
    @Query('doctorID') doctorID: string,
    @Query('patientID') patientID: string,
  ) {
    if (!doctorID || !patientID) {
      return this.chatService.findAll()
    }

    if (doctorID && patientID) {
      return this.chatService.findAllParams({ doctorID, patientID })
    }
  }

  @Get(':id')
  findOne(@Param('id') id: any) {
    return this.chatService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id)
  }
}
