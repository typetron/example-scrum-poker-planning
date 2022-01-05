import { ErrorHandler, Request } from '@Typetron/Router/Http'
import { EntityNotFoundError } from '@Typetron/Database/EntityNotFoundError'
import { Room } from 'App/Entities/Room'

export class AppErrorHandler extends ErrorHandler {

    handle(error: Error, request?: Request) {
        if (error instanceof EntityNotFoundError && error.entity === Room)  {
            return super.handle(new Error(`Room not found`), request)
        }
        return super.handle(error, request)
    }
}
