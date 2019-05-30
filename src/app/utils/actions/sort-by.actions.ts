import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'

import { SortBy } from './../models/sort-by.model'

export const SET_SORT_TYPE    = '[SORTBY] Edit'

export class EditSortBy implements Action {
    readonly type = SET_SORT_TYPE

    constructor(public sortBy: SortBy) {}
}

export type Actions = EditSortBy
