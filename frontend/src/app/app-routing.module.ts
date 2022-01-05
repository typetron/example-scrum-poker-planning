import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RoomComponent } from './room/room.component'
import { NewRoomComponent } from './new-room/new-room.component'

const routes: Routes = [
    {
        path: '',
        component: NewRoomComponent
    },
    {
        path: ':id',
        component: RoomComponent
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
