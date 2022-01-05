import { Field, Form } from '@Typetron/Forms'

export class UserForm extends Form {

    @Field()
    name?: string

    @Field()
    card?: number

    @Field()
    spectator?: boolean
}
