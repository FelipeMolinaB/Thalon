import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';

import { ProductsState } from './../utils/app.state';
import { AddedProduct } from './../utils/models/added-products.model'
import * as ProductsActions from './../utils/actions/shopping-cart.actions'

import { CurrencyState } from './../utils/app.state';
import { CurrentCurrency } from './../utils/models/current-currency.model'
import * as CurrencyActions from './../utils/actions/current-currency.actions'

import { GuestInfoState } from './../utils/app.state';
import { GuestInfo } from './../utils/models/guest-info.model'
import * as GuestInfoActions from './../utils/actions/guest-info.actions'

import { ProductsService } from '../utils/services/products.service'

import { findProduct, getElementQuantity, getPriceIn, updateQuantity, setCurrency } from './../products/products.methods'
import { Dropdown,FormSelect,FloatingActionButton,Collapsible } from 'materialize-css'

import { Toast } from 'materialize-css'

import { SHOPPING_CART_ID } from '../utils/app.constants'

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  @ViewChild('paymentMethodL') paymentMethodL: ElementRef;
  @ViewChild('commentsL') commentsL: ElementRef;

  @ViewChild('paymentMethodS') paymentMethodS: ElementRef;
  @ViewChild('commentsS') commentsS: ElementRef;

  public addedProducts;
  public listView = [];
  public currency;
  public currenciesList;
  public paymentMethods = [{name:'Cuenta de habitación',method:1}];

  public getElementQuantity = getElementQuantity;
  public getPriceIn = getPriceIn;
  public updateQuantity = updateQuantity;
  public setCurrency = setCurrency;

  public guestInfo:GuestInfo;

  constructor(private scStore: Store<ProductsState>, private ccStore: Store<CurrencyState>, private giStore: Store<GuestInfoState>, private _productsService: ProductsService) {  }

  ngOnInit() {
    $(document).ready(function(){
        $(".dropdown-trigger").dropdown();
        $('.modal').modal();
        $('select').formSelect();
        $('.fixed-action-btn').floatingActionButton();
        $('.collapsible').collapsible();
    })

    this.scStore.select('shoppingCart').subscribe(((state) => {
      console.log('Catching the chages');
      this.listView = [];
      this.addedProducts = state;
      for(let addedProduct of this.addedProducts){
        let productsList = this._productsService.getProducts(addedProduct.productType);
        for (let product of productsList){
          if (product.id == addedProduct.id){
            this.listView.push(product);
            break;
          }
        }
      }
      console.log(this.listView);
    }));
    this.ccStore.select('currentCurrency').subscribe(((state) => {
      this.currency = state;
    }));
    this.giStore.select('guestInfo').subscribe((state) => {
      this.guestInfo = state;
    });

    this.currenciesList = this._productsService.getCurrenciesList();
    this._productsService.getTRM().subscribe((data) => {
      this.currenciesList[1].sf = parseFloat(data['trm']);
    });
  }

  getTotalPrice(){
    let totalPrice = 0;
    for(let addedProduct of this.addedProducts){
      let productsList = this._productsService.getProducts(addedProduct.productType);
      for (let product of productsList){
        if (product.id == addedProduct.id){
          totalPrice += (addedProduct.quantity*product.price)
          break;
        }
      }
    }
    if (this.currency.code!='COP'){
      return totalPrice/this.currency.sf
    }
    return totalPrice;
  }

  setPaymentMethod(method){
    console.log(method)
  }

  onFocus(view:string){
    let el;
    switch (view){
      case 'l':{
        el = $('#textarea-l')[0];
        break;
      }
      case 'm':{
        el = $('#textarea-m')[0];
        break;
      }
    }
    el.style.height = '105px';
    el.style.overflowY = 'scroll';
  }

  onBlur(view:string){
    let el;
    switch (view){
      case 'l':{
        el = $('#textarea-l')[0];
        break;
      }
      case 'm':{
        el = $('#textarea-m')[0];
        break;
      }
    }
    el.style.height = '45px'
    el.style.overflowY = 'hidden'
  }

  sendGuestsRequestL(){
    let request = {
      guest: this.guestInfo,
      request: this.addedProducts,
      paymentMethod : this.paymentMethods[this.paymentMethodL.nativeElement.selectedIndex-1],
      comments : this.commentsL.nativeElement.value
    }
    console.log(request)
    this._productsService.sendRequest(request)
    .subscribe((data)=>{
      if(data['confirmation']){
        let toast = new Toast({html: 'Su solicitud ha sido recibida', displayLength: 1000})
        let toast2 = new Toast({html: 'Su solicitud esta siendo procesada', displayLength: 1000})
        this.scStore.dispatch(new ProductsActions.CleanList());
        localStorage.removeItem(SHOPPING_CART_ID);
      }
    })
  }

  sendGuestsRequestS(){
    let request = {
      guest: this.guestInfo,
      request: this.addedProducts,
      paymentMethod : this.paymentMethods[this.paymentMethodS.nativeElement.selectedIndex-1],
      comments : this.commentsS.nativeElement.value
    }
    console.log(request)
    this._productsService.sendRequest(request)
    .subscribe((data)=>{
      if(data['confirmation']){
        let toast = new Toast({html: 'Su solicitud ha sido recibida', displayLength: 3000});
        this.scStore.dispatch(new ProductsActions.CleanList());
        localStorage.removeItem(SHOPPING_CART_ID);
      }
    })
  }
}
