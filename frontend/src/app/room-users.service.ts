import { Injectable } from '@angular/core'
import { socket } from './api'
import { User } from '@Data/Models/User'

@Injectable({
    providedIn: 'root'
})
export class RoomUsersService {

    async add(room: number) {
        return await socket.request<User>(`rooms.users.add`, {parameters: [room]})
    }

    async delete(room: number) {
        await socket.request<User>(`rooms.users.delete`, {parameters: [room]})
    }

}
