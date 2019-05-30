import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'

import { CurrentCurrency } from './../models/current-currency.model'

export const SET_CURRENCY    = '[CURRENCY] Edit'

export class EditCurrency implements Action {
    readonly type = SET_CURRENCY

    constructor(public currency: CurrentCurrency) {}
}

export type Actions = EditCurrency
