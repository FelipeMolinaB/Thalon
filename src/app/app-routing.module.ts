import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './utils/guards/auth.guard'

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LaundryComponent } from './laundry/laundry.component';
import { RoomkeepingComponent } from './roomkeeping/roomkeeping.component';
import { MainContentComponent } from './main-content/main-content.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AccountStatusComponent } from './account-status/account-status.component';
import { RequestsHistoryComponent } from './requests-history/requests-history.component';
import { HotelServicesInfoComponent } from './hotel-services-info/hotel-services-info.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        canActivate: [AuthGuard],
        component: HomeComponent,
        children: [
            {path: '', component: MainContentComponent},
            {path: 'products/:id', component: ProductsComponent},
            {path: 'services/laundry', component: LaundryComponent},
            {path: 'services/roomkeeping', component: RoomkeepingComponent},
            {path: 'services/info', component: HotelServicesInfoComponent},
            {path: 'account_info/account_status', component: AccountStatusComponent},
            {path: 'account_info/requests_history', component: RequestsHistoryComponent},
            {path: 'shopping_cart', component: ShoppingCartComponent}
        ]
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
export const routingComponents = [HomeComponent,LoginComponent,LaundryComponent,MainContentComponent,RoomkeepingComponent,
                                  HotelServicesInfoComponent,AccountStatusComponent,RequestsHistoryComponent,ShoppingCartComponent,ProductsComponent]
