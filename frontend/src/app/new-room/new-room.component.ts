import { Component } from '@angular/core'
import { RoomForm } from '@Data/Forms/RoomForm'
import { RoomService } from '../room.service'
import { FormBuilder, isValid } from '../../utils'
import { Router } from '@angular/router'

@Component({
    selector: 'app-new-room',
    templateUrl: './new-room.component.html',
    styleUrls: ['./new-room.component.scss']
})
export class NewRoomComponent {

    form = FormBuilder.build(RoomForm)
    loading = false

    constructor(
        private roomService: RoomService,
        private router: Router,
    ) {
    }

    async createRoom() {
        if (!isValid(this.form)) {
            return
        }
        this.loading = true
        const room = await this.roomService.add(this.form.value)
            .catch(errors => {
                const formErrors = errors.message.message
                if (formErrors) {
                    console.log('new room errors ->', formErrors)
                }
                throw errors
            })
            .finally(() => this.loading = false)

        await this.router.navigate([room.id])
    }
}
