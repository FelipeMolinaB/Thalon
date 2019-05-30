import { Action } from '@ngrx/store'
import { SortBy } from './../models/sort-by.model'
import * as SortActions from './../actions/sort-by.actions'



const initialState: SortBy = {
    type: 1
}

export function sbReducer(state: SortBy = initialState, action: SortActions.Actions) {
    switch(action.type) {
      case SortActions.SET_SORT_TYPE:{
        return action.sortBy;
      }
      default:{
        return state;
      }
    }
}
