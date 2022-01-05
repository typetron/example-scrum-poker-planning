import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { User } from '@Data/Models/User'
import { socket } from './api'
import { UserForm } from '@Data/Forms/UserForm'
import { RegisterForm } from '@Data/Forms/RegisterForm'

@Injectable({
    providedIn: 'root'
})
export class UserService {

    user$ = new BehaviorSubject<User | undefined>(undefined)

    async edit(form: Partial<UserForm>) {
        const user = await socket.request<User>(`users.edit`, {body: form})
        this.user$.next(user)
    }

    async register(form: RegisterForm) {
        const response = await socket.request<{token: string, user: User}>(`register`, {body: form})
        localStorage.setItem('token', response.token)
        this.user$.next(response.user)
    }

    async login() {
        const token = localStorage.getItem('token')
        if (!token) {
            this.user$.next(undefined)
            return
        }
        try {
            const user = await socket.request<User>(`login`, {body: token})
            this.user$.next(user)
        } catch (e) {
            this.user$.next(undefined)
        }
    }
}

