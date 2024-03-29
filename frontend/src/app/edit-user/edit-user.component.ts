import { Component, Input, OnInit } from '@angular/core'
import { UserForm } from '@Data/Forms/UserForm'
import { User } from '@Data/Models/User'
import { FormBuilder } from '../../utils'

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

    @Input() user!: User

    form = FormBuilder.build(UserForm)

    ngOnInit(): void {
        this.form.patchValue(this.user)
    }

}
