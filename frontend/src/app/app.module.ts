import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n'
import { registerLocaleData } from '@angular/common'
import en from '@angular/common/locales/en'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NzGridModule } from 'ng-zorro-antd/grid'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzInputModule } from 'ng-zorro-antd/input'
import { RoomComponent } from './room/room.component'
import { NewRoomComponent } from './new-room/new-room.component'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzCardModule } from 'ng-zorro-antd/card'
import { NzSpinModule } from 'ng-zorro-antd/spin'
import { RegisterPlayerComponent } from './register-player/register-player.component'
import { NzModalModule } from 'ng-zorro-antd/modal'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { NzSwitchModule } from 'ng-zorro-antd/switch'
import { NzTypographyModule } from 'ng-zorro-antd/typography'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { EditUserComponent } from './edit-user/edit-user.component'
import { NzNotificationModule } from 'ng-zorro-antd/notification'

registerLocaleData(en)

@NgModule({
    declarations: [
        AppComponent,
        RoomComponent,
        NewRoomComponent,
        RegisterPlayerComponent,
        EditUserComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NzModalModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NzGridModule,
        NzButtonModule,
        ReactiveFormsModule,
        NzFormModule,
        NzInputModule,
        NzLayoutModule,
        NzCardModule,
        NzSpinModule,
        NzAvatarModule,
        NzDropDownModule,
        NzMenuModule,
        NzSwitchModule,
        NzTypographyModule,
        NzIconModule,
        NzToolTipModule,
        NzNotificationModule
    ],
    providers: [{provide: NZ_I18N, useValue: en_US}],
    bootstrap: [AppComponent]
})
export class AppModule {}
