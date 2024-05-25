import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
  WsResponse,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import { ChatService } from './chat.service'
import { CreateChatDto } from './dto/create-chat.dto'
import { UpdateChatDto } from './dto/update-chat.dto'
import { Server, Socket } from 'socket.io'
import { Chat } from './entities/chat.entity'
import { Observable, from, map } from 'rxjs'
import { MessagesService } from 'src/messages/messages.service'
import { CreateMessageDto } from 'src/messages/dto/create-message.dto'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private chatService: ChatService,
    private messageService: MessagesService,
  ) {}

  @WebSocketServer() server: Server

  @SubscribeMessage('events')
  handleEvent(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): WsResponse<unknown> {
    console.log(data)

    const message = {
      message: data.message,
      doctor: {
        doctor_id: data.doctor_id,
      },
      chat: {
        id: data.chat_id,
        doctor: {
          doctor_id: data.doctor_id,
        },
      },
    }

    console.log(message)

    const event = data.event
    // @ts-ignore
    this.messageService.create(message)
    // this.server.emit(event, message)
    return { event, data }
  }

  afterInit(server: Server) {
    console.log(server)
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`)
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`)
    //Do stuffs
  }
}
