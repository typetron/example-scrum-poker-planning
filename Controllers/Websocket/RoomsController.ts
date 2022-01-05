import { Controller, Event } from '@Typetron/Router'
import { RoomForm } from 'App/Forms/RoomForm'
import { Room } from 'App/Entities/Room'
import { Room as RoomModel } from 'App/Models/Room'
import { RoomEditForm } from 'App/Forms/RoomEditForm'
import { WebSocket } from '@Typetron/Router/Websockets'

@Controller('rooms')
export class RoomsController {
    @Event()
    async edit(room: Room, form: RoomEditForm, socket: WebSocket) {
        await room.save(form)
        await room.load('users')
        socket.publishAndSend(`rooms.${room?.id}`, 'rooms.read', RoomModel.from(room))
        return RoomModel.from(room)
    }

    @Event()
    add(form: RoomForm) {
        return RoomModel.from(Room.create(form))
    }

    @Event()
    async reset(room: Room, socket: WebSocket) {
        await room.save({showCards: false})
        await room.users.newQuery().update({card: undefined})
        await room.load('users')
        socket.publishAndSend(`rooms.${room?.id}`, 'rooms.read', RoomModel.from(room))
        return RoomModel.from(room)
    }

    @Event()
    async read(room: Room) {
        await room.load('users')
        return RoomModel.from(room)
    }

}
