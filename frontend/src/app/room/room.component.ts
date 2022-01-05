import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core'
import { RoomService } from '../room.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Room } from '@Data/Models/Room'
import { UserService } from '../user.service'
import { NzModalService } from 'ng-zorro-antd/modal'
import { RegisterPlayerComponent } from '../register-player/register-player.component'
import { RoomUsersService } from '../room-users.service'
import { User } from '@Data/Models/User'
import { socket } from '../api'
import { UserForm } from '@Data/Forms/UserForm'
import { debounceTime, filter, skip, take } from 'rxjs/operators'
import { EditUserComponent } from '../edit-user/edit-user.component'
import { Subject } from 'rxjs'

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
    room?: Room
    user?: User
    cards = Array.from(new Array(12)).map((_, a) => this.Fibonacci(a)).unique()
    roomUpdate$ = new Subject<string>()

    constructor(
        private roomService: RoomService,
        private roomUsersService: RoomUsersService,
        private usersService: UserService,
        private modal: NzModalService,
        private router: Router,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private zone: NgZone
    ) {
    }

    async ngOnInit() {
        const roomId = Number(this.route.snapshot.paramMap.get('id'))

        this.roomUpdate$.pipe(debounceTime(200)).subscribe(name => {
            this.roomService.edit(roomId, {name})
        })

        socket.on<Room>('rooms.read').subscribe(room => {
            this.zone.run(() => {
                this.room = room
                this.cd.detectChanges()
            })
        })

        this.usersService.user$.pipe(skip(1)).subscribe(async user => {
            if (!user) {
                this.registerUser()
            } else {
                this.user = user
            }
        })

        this.usersService.user$.pipe(filter(i => Boolean(i)), take(1)).subscribe(async (user) => {
            await this.joinRoom(roomId)
        })

        await this.usersService.login()
    }

    Fibonacci(n: number): number {
        return n < 2
            ? n
            : this.Fibonacci(n - 1) + this.Fibonacci(n - 2)
    }

    async selectCard(user: User, card: number) {
        user.card = card

        await this.usersService.edit({card})
        this.cd.detectChanges()
    }

    async revealCards(room: Room) {
        await this.roomService.edit(room.id, {showCards: true})
    }

    async resetEstimation(room: Room) {
        await this.roomService.reset(room.id)
    }

    private registerUser() {
        this.modal.create({
            nzTitle: 'Join this room',
            nzContent: RegisterPlayerComponent,
            nzMaskClosable: false,
            nzOnOk: async instance => {
                await this.usersService.register(instance.form.value)
            }
        })
    }

    private async joinRoom(room: number) {
        await this.roomUsersService.add(room).catch(() => {
            this.router.navigateByUrl('/')
        })
    }

    findPlayer(id: number) {
        return this.room?.users.findWhere('id', id)
    }

    async updateUser(form: Partial<UserForm>) {
        await this.usersService.edit(form)
    }

    showUserEditModal(user: User) {
        this.modal.create({
            nzTitle: 'Change name',
            nzContent: EditUserComponent,
            nzComponentParams: {user},
            nzOnOk: async modal => {
                await this.usersService.edit(modal.form.value)
            }
        })
    }

    async leaveRoom(room: number) {
        await this.zone.run(async () => {
            await this.roomUsersService.delete(room)
            await this.router.navigateByUrl('/')
        })
    }
}
