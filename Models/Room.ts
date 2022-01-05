import { Field, FieldMany, Model } from '@Typetron/Models'
import { User } from './User'

export class Room extends Model {
    @Field()
    id: number

    @Field()
    name: string

    @Field()
    showCards: boolean

    @FieldMany(User)
    users: User[]
}
