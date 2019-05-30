import { Action } from '@ngrx/store'
import { CurrentCurrency } from './../models/current-currency.model'
import * as CurrencyActions from './../actions/current-currency.actions'



const initialState: CurrentCurrency = {
    img: 'colombia.svg',
    code: 'COP',
    sf: 1
}

export function ccReducer(state: CurrentCurrency = initialState, action: CurrencyActions.Actions) {
    switch(action.type) {
      case CurrencyActions.SET_CURRENCY:{
        return action.currency;
      }
      default:{
        return state;
      }
    }
}
