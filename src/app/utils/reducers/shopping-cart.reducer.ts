import { Action } from '@ngrx/store'
import { AddedProduct } from './../models/added-products.model'
import * as ProductsActions from './../actions/shopping-cart.actions'


import { SHOPPING_CART_ID } from '../app.constants'


export function scReducer(state: AddedProduct[] = getInitialState(), action: ProductsActions.Actions) {
    switch(action.type) {
      case ProductsActions.ADD_PRODUCT:{
        localStorage.setItem(SHOPPING_CART_ID, JSON.stringify([...state, action.product]));
        return [...state, action.product];
      }
      case ProductsActions.EDIT_PRODUCT:{
        state[action.index].quantity += action.step;
        if (state[action.index].quantity==0){
          state.splice(action.index,1);
        }
        localStorage.setItem(SHOPPING_CART_ID, JSON.stringify(state));
        return state;
      }
      case ProductsActions.CLEAN_LIST:{
        return []
      }
      default:{
        return state;
      }
    }
}

function getInitialState(){
  let saved_info = JSON.parse(localStorage.getItem(SHOPPING_CART_ID))
  if(saved_info){
    console.log(saved_info.length)
    if(saved_info.length>0){
      return saved_info
    }
  }
  return []
}
