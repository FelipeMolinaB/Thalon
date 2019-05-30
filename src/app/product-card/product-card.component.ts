import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { ProductsState } from './../utils/app.state';
import { AddedProduct } from './../utils/models/added-products.model'
import * as ProductsActions from './../utils/actions/shopping-cart.actions'

import { CurrencyState } from './../utils/app.state';
import { CurrentCurrency } from './../utils/models/current-currency.model'
import * as CurrencyActions from './../utils/actions/current-currency.actions'

import { findProduct, getElementQuantity, getPriceIn, updateQuantity, setCurrency,wasAdded,addProduct } from './../products/products.methods'


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() public parent;
  @Input() public listView;
  @Input() public product;
  @Input() public productType;


  public currency:CurrentCurrency;
  public addedProducts:AddedProduct[];

  public getElementQuantity = getElementQuantity;
  public getPriceIn = getPriceIn;
  public updateQuantity = updateQuantity;
  public setCurrency = setCurrency;
  public wasAdded = wasAdded;
  public addProduct = addProduct;

  constructor(private scStore: Store<ProductsState>,private ccStore: Store<CurrencyState>) { }

  ngOnInit() {
    this.scStore.select('shoppingCart').subscribe((state => this.addedProducts = state));
    this.ccStore.select('currentCurrency').subscribe((state => this.currency = state));
  }

}
