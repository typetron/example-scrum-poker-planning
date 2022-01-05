import { Component, OnInit } from '@angular/core'
import { socket } from './api'
import { NzNotificationService } from 'ng-zorro-antd/notification'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private notification: NzNotificationService) {
    }

    ngOnInit() {
        socket.errors$.subscribe(error => {
            this.notification.error(error.message?.message ?? '', '')
        })
    }

}
