import { Field, Form, Rules } from '@Typetron/Forms'
import { Email, MinLength, Required } from '@Typetron/Validation'

export class RegisterForm extends Form {

    @Field()
    @Rules(Required)
    name: string
}
