import { RegisterForm } from 'App/Forms/RegisterForm'
import { User } from 'App/Entities/User'
import { User as UserModel } from 'App/Models/User'
import { Inject } from '@Typetron/Container'
import { Auth } from '@Typetron/Framework/Auth'
import { Body, Controller, Action } from '@Typetron/Router'

@Controller()
export class AuthController {

    @Inject()
    auth: Auth

    @Action()
    async register(form: RegisterForm) {
        const user = await User.create({name: form.name})
        return {
            user: UserModel.from(user),
            token: await this.auth.loginUser(user)
        }
    }

    @Action()
    async login(@Body() token: string) {
        await this.auth.verify(token)
        const user = await this.auth.user<User>() as User
        if (!user) {
            throw new Error('Unauthenticated')
        }
        return UserModel.from(user)
    }

}
