import { Controller, Event } from '@Typetron/Router'
import { User as UserModel } from 'App/Models/User'
import { Room as RoomModel } from 'App/Models/Room'
import { User } from 'App/Entities/User'
import { UserForm } from 'App/Forms/UserForm'
import { WebSocket } from '@Typetron/Router/Websockets'
import { Room } from 'App/Entities/Room'
import { AuthUser } from '@Typetron/Framework/Auth'

@Controller('users')
export class UsersController {

    @Event()
    async edit(@AuthUser() user: User, form: UserForm, socket: WebSocket) {
        await user.save(form)
        await user.load('room.users')
        const room = user.room.get() as Room
        socket.publishAndSend(`rooms.${room?.id}`, 'rooms.read', RoomModel.from(room))
        return UserModel.from(user)
    }
}
