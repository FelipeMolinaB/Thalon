import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'

//
import { AddedProduct } from './../models/added-products.model'

export const ADD_PRODUCT       = '[PRODUCT] Add'
export const EDIT_PRODUCT    = '[PREDUCT] Edit'
export const CLEAN_LIST    = '[PREDUCT] Clean'

export class AddProduct implements Action {
    readonly type = ADD_PRODUCT

    constructor(public product: AddedProduct) {}
}

export class EditProduct implements Action {
    readonly type = EDIT_PRODUCT

    constructor(public index: number,public step:number) {}
}

export class CleanList implements Action {
    readonly type = CLEAN_LIST

    constructor() {}
}

export type Actions = AddProduct | EditProduct | CleanList

//
