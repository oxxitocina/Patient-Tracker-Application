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


@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private chatService: ChatService) {}

  @WebSocketServer() server: Server

  @SubscribeMessage('events')
  handleEvent(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): WsResponse<unknown> {
    console.log(data)
    const message = new CreateChatDto()
    message.email = 'awd'
    message.text = data.message
    message.createdAt = new Date()
    const event = data.event
    this.chatService.create(message)
    this.server.emit(event, data.message)
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
