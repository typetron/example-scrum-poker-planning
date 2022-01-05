import { Field, Form, Rules } from '@Typetron/Forms'
import { Email, Required } from '@Typetron/Validation'

export class RoomJoinForm extends Form {
    @Field()
    @Rules(Required)
    user: number
}
