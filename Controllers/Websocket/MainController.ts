import { Controller, OnClose } from '@Typetron/Router'
import { AuthUser } from '@Typetron/Framework/Auth'
import { Room } from 'App/Entities/Room'
import { Room as RoomModel } from 'App/Models/Room'
import { WebSocket } from '@Typetron/Router/Websockets'
import { User } from 'App/Entities/User'
import { Inject } from '@Typetron/Container'
import { WebsocketsProvider } from '@Typetron/Framework/Providers/WebsocketsProvider'

@Controller()
export class MainController {

    @Inject()
    webSocketsProvider: WebsocketsProvider

    @AuthUser()
    user?: User

    @OnClose
    async onClose(socket: WebSocket) {
        if (this.user) {
            const room = this.user.room.get()
            this.webSocketsProvider.sockets.delete(this.user.id)
            if (room) {
                // TODO create the .remove method on HasMany Field room.users.remove(user)
                await this.user.save({room: undefined})
                await room.load('users')
                room.users.items.forEach(user => {
                    this.webSocketsProvider.sockets.get(user.id)?.send('rooms.read', RoomModel.from(room as Room))
                })
            }
        }
    }

}
