import { BelongsTo, Column, CreatedAt, Options, Relation } from '@Typetron/Database'
import { User as Authenticatable } from '@Typetron/Framework/Auth'
import { Room } from 'App/Entities/Room'

@Options({
    table: 'users'
})
export class User extends Authenticatable {
    @Column()
    name: string

    @Relation(() => Room, 'users')
    room: BelongsTo<Room>

    @Column()
    card: number

    @Column()
    spectator: boolean = false
}
