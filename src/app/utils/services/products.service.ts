import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { SERVER_URL } from '../app.constants'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class ProductsService {

  public _trmWS:string = SERVER_URL + "/currencies?trm";
  public _requestsWS:string = SERVER_URL + "/request";
  public products = {
    alcoholic_drinks:[{id:"1",name:"Vodka",price:20000,inStock:0,image:"vodka.jpg",description:"Descripción"},{id:"2",name:"Aguardiente",price:20001,inStock:2,image:"aguardiente.jpeg",description:"Descripción"},{id:"3",name:"Ron",price:20002,inStock:7,image:"ron.jpeg",description:"Descripción"},{id:"10",name:"Tequila",price:20003,inStock:7,image:"tequila.png",description:"Descripción"}],
    hot_drinks:[{id:"4",name:"Cafe",price:20000,inStock:3,image:"cafe.jpeg",description:"Descripción"},{id:"5",name:"Chocolate",price:20000,inStock:2,image:"chocolate.jpeg",description:"Descripción"},{id:"6",name:"Aromatica",price:20000,inStock:7,image:"aromatica.png",description:"Descripción"}],
    cold_drinks:["a1"],
    personal_care:["a1"],
    starters:["a1"],
    main_coursers:["a1"],
    desserts:["a1"],
    snacks:["a1"]
  };
  public trm;


  constructor(private http: HttpClient) {}

  getProducts(sortOf:string = null){
    let productList;
    switch(sortOf) {
      case "alcoholic_drinks": {
        productList = this.products.alcoholic_drinks;
        break;
      }
      case "hot_drinks": {
        productList = this.products.hot_drinks;
        break;
      }
      case "cold_drinks": {
        productList = this.products.cold_drinks;
        break;
      }
      case "personal_care": {
        productList = this.products.personal_care;
        break;
      }
      case "starters": {
        productList = this.products.starters;
        break;
      }
      case "main_coursers": {
        productList = this.products.main_coursers;
        break;
      }
      case "desserts": {
        productList = this.products.desserts;
        break;
      }
      case "snacks": {
        productList = this.products.snacks;
        break;
      }
      default: {
        break;
      }
    }
    return productList;
  }

  getTRM(){
    return this.http.get(this._trmWS)
  }

  getCurrenciesList(){
    return [{img:"colombia.svg",code:'COP',sf:1},{img:"united-states.svg",code:'USD',sf:this.trm}]
  }

  sendRequest(request){
    return this.http.post(this._requestsWS, request, httpOptions)
  }

}
