import { Component } from '@angular/core'
import { FormBuilder } from '@typetron/angular'
import { RegisterForm } from '@Data/Forms/RegisterForm'

@Component({
    selector: 'app-register-player',
    templateUrl: './register-player.component.html',
    styleUrls: ['./register-player.component.scss']
})
export class RegisterPlayerComponent {

    form = FormBuilder.build(RegisterForm)
}
