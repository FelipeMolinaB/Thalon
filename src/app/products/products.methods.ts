import * as ProductsActions from './../utils/actions/shopping-cart.actions'
import * as CurrencyActions from './../utils/actions/current-currency.actions'


export function findProduct(productId,array){
  for(let i = 0;i < array.length;i++){
    if (array[i].id==productId){
      return i;
    }
  }
  return -1;
}

export function getElementQuantity(productId,array){
  let i = findProduct(productId,array);
  if (i>=0){
      return array[i].quantity;
  }
  return 0;
}

export function getPriceIn(productId,array,currency){
  let i = findProduct(productId,array);
  if (i>=0){
    if (currency.code!='COP'){
      return array[i].price/currency.sf
    }
    return array[i].price
  }
}

export function setCurrency(code:string,currenciesList,store){
  for (let currency of currenciesList){
    if(currency.code==code){
      store.dispatch(new CurrencyActions.EditCurrency(currency));
      break;
    }
  }
}

export function wasAdded(productId,array){
  let i = findProduct(productId,array);
  if (i>=0){
    if (array[i].quantity!=0){
      return true;
    }
  }
  return false;

}

export function updateQuantity(array,productId,step,store){
  let i = findProduct(productId,array);
  console.log(i);
  if (i>=0){
    store.dispatch(new ProductsActions.EditProduct(i,step));
    console.log('dispatch Done');
  }
}

export function addProduct(productId,store,productType){
  store.dispatch(new ProductsActions.AddProduct({id: productId, quantity: 1, productType: productType}));
}
