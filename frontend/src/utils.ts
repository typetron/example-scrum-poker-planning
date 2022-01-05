import { FormArray, FormGroup } from '@angular/forms'

export function isValid(form: FormGroup | FormArray) {
    Object.values(form.controls).forEach(control => {
        control.markAsDirty()
        control.updateValueAndValidity()
        if (control instanceof FormArray) {
            control.controls.forEach(item => {
                isValid(item as FormGroup)
            })
        }

        if (control instanceof FormGroup) {
            isValid(control)
        }
    })

    return form.valid
}
