import { Field, Form, Rules } from '@Typetron/Forms'
import { Email, Required } from '@Typetron/Validation'

export class RoomEditForm extends Form {
    @Field()
    name: string

    @Field()
    showCards: boolean
}
