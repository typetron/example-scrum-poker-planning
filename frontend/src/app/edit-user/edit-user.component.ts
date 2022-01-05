import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder } from '@typetron/angular'
import { UserForm } from '@Data/Forms/UserForm'
import { User } from '@Data/Models/User'

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
