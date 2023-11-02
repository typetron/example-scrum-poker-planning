import { Controller, Action } from '@Typetron/Router'
import { Room } from 'App/Entities/Room'
import { User } from 'App/Entities/User'
import { WebSocket } from '@Typetron/Router/Websockets'
import { Room as RoomModel } from 'App/Models/Room'
import { AuthUser } from '@Typetron/Framework/Auth'
import { Inject } from '@Typetron/Container'
import { WebsocketsProvider } from '@Typetron/Framework/Providers/WebsocketsProvider'

@Controller('rooms.users')
export class RoomUsersController {

    @Inject()
    webSocketsProvider: WebsocketsProvider

    @AuthUser()
    user: User

    @Action()
    async add(room: Room, socket: WebSocket) {
        socket.subscribe(`rooms.${room.id}`)
        await room.users.save(this.user)

        await room.load('users')
        socket.publishAndSend(`rooms.${room?.id}`, 'rooms.read', RoomModel.from(room))
        this.webSocketsProvider.sockets.set(this.user.id, socket)
    }

    @Action()
    async delete(room: Room, socket: WebSocket) {
        socket.unsubscribe(`rooms.${room.id}`)
        await this.user.save({room: undefined})

        await room.load('users')
        socket.publishAndSend(`rooms.${room?.id}`, 'rooms.read', RoomModel.from(room))
        this.webSocketsProvider.sockets.delete(this.user.id)
    }
}
