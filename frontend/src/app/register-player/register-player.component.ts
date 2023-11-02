import { Component } from '@angular/core'
import { RegisterForm } from '@Data/Forms/RegisterForm'
import { FormBuilder } from '../../utils'

@Component({
    selector: 'app-register-player',
    templateUrl: './register-player.component.html',
    styleUrls: ['./register-player.component.scss']
})
export class RegisterPlayerComponent {

    form = FormBuilder.build(RegisterForm)
}
