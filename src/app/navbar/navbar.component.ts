import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { TOKEN_ID } from '../utils/app.constants'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }

  showShoppingCart(){
      this.router.navigate(['/shopping_cart'])
  }

  logout(){
      localStorage.removeItem(TOKEN_ID);
      this.router.navigate(['/login'])
  }
}
