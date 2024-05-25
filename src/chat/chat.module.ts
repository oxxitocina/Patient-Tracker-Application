import { Module } from '@nestjs/common'
import { ChatService } from './chat.service'
import { ChatGateway } from './chat.gateway'
import { Chat } from './entities/chat.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChatController } from './chat.controller'
import { MessagesService } from 'src/messages/messages.service'
import { MessagesModule } from 'src/messages/messages.module'

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), MessagesModule],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
