import { Column, Entity, HasMany, ID, Options, PrimaryColumn, Relation } from '@Typetron/Database'
import { User } from 'App/Entities/User'

@Options({
    table: 'rooms'
})
export class Room extends Entity {
    @PrimaryColumn()
    id: ID

    @Column()
    name: string

    @Column()
    showCards: boolean

    @Relation(() => User, 'room')
    users: HasMany<User>
}
