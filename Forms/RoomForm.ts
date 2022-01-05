import { Field, Form, Rules } from '@Typetron/Forms'
import { Email, Required } from '@Typetron/Validation'

export class RoomForm extends Form {
    @Field()
    @Rules(Required)
    name: string

    @Field()
    showCards: boolean
}
