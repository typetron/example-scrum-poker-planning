import { Injectable } from '@angular/core'
import { RoomForm } from '@Data/Forms/RoomForm'
import { socket } from './api'
import { Room } from '@Data/Models/Room'
import { RoomEditForm } from '@Data/Forms/RoomEditForm'

@Injectable({
    providedIn: 'root'
})
export class RoomService {

    add(form: RoomForm) {
        return socket.request<Room>('rooms.add', {body: form})
    }

    edit(id: number, form: Partial<RoomEditForm>) {
        return socket.request<Room>('rooms.edit', {parameters: [id], body: form})
    }

    reset(id: number) {
        return socket.request<Room>('rooms.reset', {parameters: [id]})
    }
}
