import { Websocket } from '@typetron/websockets'
import { environment } from '../environments/environment'

export const socket = new Websocket(environment.api)
