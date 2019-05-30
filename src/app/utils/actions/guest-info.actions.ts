import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'

//
import { GuestInfo } from './../models/guest-info.model'

export const UPDATE_INFO    = '[GUESTINFO] Update'

export class UpdateInfo implements Action {
    readonly type = UPDATE_INFO

    constructor(public guestInfo: GuestInfo) {}
}

export type Actions = UpdateInfo
