import { Module } from '@nestjs/common'
import { ChatService } from './chat.service'
import { ChatGateway } from './chat.gateway'
import { Chat } from './entities/chat.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChatController } from './chat.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
