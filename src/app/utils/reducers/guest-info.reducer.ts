import { Action } from '@ngrx/store'
import { GuestInfo } from './../models/guest-info.model'
import * as GuestInfoActions from './../actions/guest-info.actions'

const initialState: GuestInfo = {
    id: null,
    name: null,
    room: null
}


export function giReducer(state: GuestInfo = initialState, action: GuestInfoActions.Actions) {
    switch(action.type) {
      case GuestInfoActions.UPDATE_INFO:{
        return action.guestInfo;
      }
      default:{
        return state;
      }
    }
}
