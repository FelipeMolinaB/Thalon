import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router'

import { AuthService, CheckLogin } from '../utils/services/auth.service'

import { Toast } from 'materialize-css'

import { TOKEN_ID } from '../utils/app.constants'

import { Store } from '@ngrx/store';
import { GuestInfoState } from '../utils/app.state';
import { GuestInfo } from '../utils/models/guest-info.model'
import * as GuestInfoActions from '../utils/actions/guest-info.actions'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('user') usernameInput: ElementRef;
  @ViewChild('password') passwordInput: ElementRef;
  public checkLogin;

  constructor(private router: Router, private auth: AuthService, private giStore: Store<GuestInfoState>) { }

  ngOnInit() {
    let isAllowed = this.auth.isLogged('login componet')
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
    }
  }

  login(){
    let username = this.usernameInput.nativeElement.value
    let password = this.passwordInput.nativeElement.value

    this.auth.checkLogin(username,password)
    .subscribe((data: CheckLogin) => this.checkLogin = data);
    if(this.checkLogin){
      if(!this.checkLogin['username']){
        let toast = new Toast({html: 'Usuario no registrado', displayLength: 1000});
        console.log('Usuario no registrado');
      }else if(!this.checkLogin['password']){
        let toast = new Toast({html: 'Contraseña incorrecta', displayLength: 1000});
        console.log('Contraseña incorrecta');
      }else{
        console.log(this.checkLogin);
        localStorage.setItem(TOKEN_ID, this.checkLogin['jwt']);
        this.router.navigate(['/'])
      }
    }
  }
}
