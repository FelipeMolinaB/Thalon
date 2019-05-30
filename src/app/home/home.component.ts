import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
import {Sidenav,Collapsible,Dropdown,FloatingActionButton} from 'materialize-css'
// import {* as $} from 'materialize-css';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("refreshing Home JS")
    $(document).ready(function(){
        (<any>$('.sidenav')).sidenav();
        $('.collapsible').collapsible();
        $(".dropdown-trigger").dropdown();
        $('.fixed-action-btn').floatingActionButton();
    })
  }

}
