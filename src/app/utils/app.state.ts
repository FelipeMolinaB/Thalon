import { AddedProduct } from './models/added-products.model'
import { CurrentCurrency } from './models/current-currency.model'
import { SortBy } from './models/sort-by.model'
import { GuestInfo } from './models/guest-info.model'

export interface ProductsState {
  readonly addedProduct: AddedProduct[];
}

export interface CurrencyState {
  readonly currency: CurrentCurrency;
}

export interface SortState {
  readonly sortStatus: SortBy;
}

export interface GuestInfoState {
  readonly guestInfo: GuestInfo;
}
