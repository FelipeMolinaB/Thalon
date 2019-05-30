import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { SERVER_URL,TOKEN_ID } from '../app.constants'

import {Buffer} from 'buffer/';
import * as crypto from "crypto-browserify";

import { GuestInfo } from '../models/guest-info.model'

@Injectable({providedIn: 'root'})
export class AuthService {
  public _checkLoginURL = SERVER_URL + "/user?login&username=";
  public _checkTokenURL = SERVER_URL + "/user?token=";
  public encryptKey: string;
  public guestInfo;
  public asyncResult;

  constructor(private http: HttpClient) {
    this.http.get<PublicKey>("assets/data/public-key.json")
    .subscribe((data: PublicKey) => this.encryptKey = data["key"]);
  }

  isLogged(src){
    console.log("Cheking if an user is logged",src)
    let token = localStorage.getItem(TOKEN_ID);
    if(token){
      return this.http.get<GuestInfo>(this._checkTokenURL + token)
    }else{
      return null
    }
  }

  checkLogin(username,password){
    console.log(this.encryptKey)
    let buffer = new Buffer(password);
    let encrypted = crypto.publicEncrypt(this.encryptKey, buffer);
    console.log("encrypted:",encrypted.toString('base64'))
    return this.http.get<CheckLogin>(this._checkLoginURL + username + "&password=" + password);

  }
}

export interface CheckLogin {
  username: boolean;
  password: boolean;
}

export interface PublicKey {
  key: string;
}
