import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router';

import { TOKEN_ID } from '../app.constants'

import { Store } from '@ngrx/store';
import { GuestInfoState } from '../app.state';
import { GuestInfo } from '../models/guest-info.model'
import * as GuestInfoActions from '../actions/guest-info.actions'


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private user: AuthService, private router:Router, private giStore: Store<GuestInfoState>){}

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot):boolean {
    let isAllowed = this.user.isLogged('Guard')
    if(isAllowed){
        isAllowed
        .subscribe((data:GuestInfo) => {
          if(data['id']){
              this.giStore.dispatch(new GuestInfoActions.UpdateInfo(data));
              this.router.navigate(['/']);
              return true
          }else{
            console.log('Deleting the unvalid token');
            localStorage.removeItem(TOKEN_ID);
            this.router.navigate(['/login']);
            return false
          }
        });
    }else{
      this.router.navigate(['/login']);
      return false
    }
    return true
  }
}
