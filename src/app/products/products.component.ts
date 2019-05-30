import { Component, OnInit,HostListener, ElementRef, ViewChild,Inject,AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsService } from '../utils/services/products.service'

import { Store } from '@ngrx/store';

import { ProductsState } from './../utils/app.state';
import { AddedProduct } from './../utils/models/added-products.model'
import * as ProductsActions from './../utils/actions/shopping-cart.actions'

import { CurrencyState } from './../utils/app.state';
import { CurrentCurrency } from './../utils/models/current-currency.model'
import * as CurrencyActions from './../utils/actions/current-currency.actions'

import { SortState } from './../utils/app.state';
import { SortBy } from './../utils/models/sort-by.model'
import * as SortActions from './../utils/actions/sort-by.actions'

import { findProduct, getElementQuantity, getPriceIn, updateQuantity, setCurrency,wasAdded,addProduct } from './products.methods'
// { findProduct, getElementQuantity, getPriceIn, updateQuantity, setCurrency,wasAdded,addProduct }
import { Dropdown,Collapsible } from 'materialize-css'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public id;
  public listView;
  public products;
  public currenciesList;
  public currency:CurrentCurrency;
  public view_table = false;
  public view_icon = 'view_module';
  public sortType:number;

  public addedProducts:AddedProduct[];

  public getElementQuantity = getElementQuantity;
  public getPriceIn = getPriceIn;
  public updateQuantity = updateQuantity;
  public setCurrency = setCurrency;
  public wasAdded = wasAdded;
  public addProduct = addProduct;

  @ViewChild('search') searchInput: ElementRef;

  constructor(private route: ActivatedRoute, private _productsService: ProductsService,private scStore: Store<ProductsState>,private ccStore: Store<CurrencyState>,private sbStore: Store<SortState>) {}

  ngOnInit() {

    this.currenciesList = this._productsService.getCurrenciesList();
    this.route.paramMap.subscribe((params:ParamMap)=> {
      this.id = params.get("id");
      this.listView = this._productsService.getProducts(this.id);
      this.products = this.listView;
      this.setSortType(this.sortType)
      this.refreshJS()
    });
    this._productsService.getTRM().subscribe((data) => {
      this.currenciesList[1].sf = parseFloat(data['trm']);
    });

    this.scStore.select('shoppingCart').subscribe((state) => {
      this.addedProducts = state;
      console.log('Paila');
    });
    this.ccStore.select('currentCurrency').subscribe((state => this.currency = state));
    this.sbStore.select('sortBy').subscribe(((state) => {this.sortType = state.type;this.sortView();}));

    this.refreshJS();
  }

  refreshJS(){
    $(document).ready(function(){
        $(".dropdown-trigger").dropdown();
        $('.collapsible').collapsible();
    })
  }

  // wasAdded(productId){
  //   let i = findProduct(productId,this.addedProducts);
  //   if (i>=0){
  //     if (this.addedProducts[i].quantity!=0){
  //       return true;
  //     }
  //   }
  //   return false;
  //
  // }
  //
  // addProduct(productId){
  //   this.scStore.dispatch(new ProductsActions.AddProduct({id: productId, quantity: 1, productType: this.id}));
  // }

  viewTable(changeView){
    this.view_table = changeView;
    if(this.view_table){
      this.view_icon = 'list'
    }else{
      this.view_icon = 'view_module'
    }
  }

  onSearchChange(value){
    if (value==''){
      this.listView = this.products;
    }else{
      this.listView = [];
      let j;
      for(let i = 0;i < this.products.length;i++){
        j = this.products[i].name.toLowerCase().search(value.toLowerCase());
        if (j>=0){
          this.listView.push(this.products[i]);
        }
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth<600){
      this.view_table = false;
    }
  }

  cleanSearchBar(){
    this.searchInput.nativeElement.value='';
    this.onSearchChange('')
  }

  setSortType(type){
    this.sbStore.dispatch(new SortActions.EditSortBy({type: type}));
  }

  sortView(){

    switch(this.sortType){
      case 1:{
        this.listView.sort((n1,n2)=>{
          if(n1.name<n2.name) return -1;
          if(n1.name>n2.name) return 1;
          return 0;
        });
        break;
      }
      case 2:{
        this.listView.sort((n1,n2)=>{
          if(n1.name>n2.name) return -1;
          if(n1.name<n2.name) return 1;
          return 0;
        });
        break;
      }
      case 3:{
        this.listView = this.listView.sort((n1,n2)=>{
          return -(n1.price-n2.price)
        });
        break;
      }
      case 4:{
        this.listView = this.listView.sort((n1,n2)=>{
          return n1.price-n2.price
        });
        break;
      }
    }
  }
}
