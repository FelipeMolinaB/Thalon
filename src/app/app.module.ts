import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule }   from '@angular/forms';
import { MatSnackBar,MatSnackBarModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import { ProductsService } from './utils/services/products.service'
import { AuthService } from './utils/services/auth.service'

import { AuthGuard } from './utils/guards/auth.guard'

import { StoreModule } from '@ngrx/store';
import { sbReducer } from './utils/reducers/sort-by.reducer';
import { scReducer } from './utils/reducers/shopping-cart.reducer';
import { ccReducer } from './utils/reducers/current-currency.reducer';
import { giReducer } from './utils/reducers/guest-info.reducer';

import { AppComponent } from './app.component';
import { UserSideNavbarContentComponent } from './user-side-navbar-content/user-side-navbar-content.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ProductCardComponent,
    UserSideNavbarContentComponent,
    NavbarComponent,
    SideNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({shoppingCart: scReducer,currentCurrency:ccReducer,sortBy:sbReducer, guestInfo:giReducer}),
    FormsModule
  ],
  providers: [
    ProductsService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
