import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router'

import { Store } from '@ngrx/store';
import { GuestInfoState } from './../utils/app.state';
import { GuestInfo } from './../utils/models/guest-info.model'
import * as GuestInfoActions from './../utils/actions/guest-info.actions'

@Component({
  selector: 'app-user-side-navbar-content',
  templateUrl: './user-side-navbar-content.component.html',
  styleUrls: ['./user-side-navbar-content.component.css']
})
export class UserSideNavbarContentComponent implements OnInit {
  @Input() public NavbarType;
  @Input() public NavbarId;

  public mainItems = [
    { name:"Comidas y Bebidas",
      icon:"add_shopping_cart",
      type:"item",
      items:[
        {name:"Bebidas",subItems:[
          // {name:"Alcoholicas",navParams:['/products', 'alcoholic_drinks']},
          {name:"Calientes",navParams:['/products', 'hot_drinks']},
          {name:"Frias",navParams:['/products', 'cold_drinks']},
        ],navParams:null},
        {name:"Comidas",subItems:[
          // {name:"Entradas",navParams:['/products', 'starters']},
          // {name:"Desayuno",navParams:['/products', 'main_coursers']},
          // {name:"Almuerzo",navParams:['/products', 'main_coursers']},
          // {name:"Cena",navParams:['/products', 'main_coursers']},
          // {name:"Postres",navParams:['/products', 'desserts']},
          {name:"Snacks",navParams:['/products', 'desserts']},
        ],navParams:null}
      ],
      navParams:null
    },
    // { name:"Entretenimiento",
    //   icon:"build",
    //   type:"item",
    //   items:[
    //     {name:"Video Juegos",subItems:[],navParams:['/services/laundry']},
    //     {name:"Dispositivos moviles",subItems:[],navParams:['/services/roomkeeping']},
    //   ],
    //   navParams:null
    // },
    // { name:"Roomkeeping",
    //   icon:"build",
    //   type:"item",
    //   items:[
    //     {name:"Video Juegos",subItems:[],navParams:['/services/laundry']},
    //     {name:"Roomkeeping",subItems:[],navParams:['/services/roomkeeping']},
    //     {name:"Información",subItems:[],navParams:['/services/info']}
    //   ],
    //   navParams:null
    // },
    // { name:"Lavanderia",
    //   icon:"build",
    //   type:"item",
    //   items:[
    //     {name:"Video Juegos",subItems:[],navParams:['/services/laundry']},
    //     {name:"Roomkeeping",subItems:[],navParams:['/services/roomkeeping']},
    //     {name:"Información",subItems:[],navParams:['/services/info']}
    //   ],
    //   navParams:null
    // },
    // { name:"Reservas",
    //   icon:"build",
    //   type:"item",
    //   items:[
    //     {name:"Video Juegos",subItems:[],navParams:['/services/laundry']},
    //     {name:"Roomkeeping",subItems:[],navParams:['/services/roomkeeping']},
    //     {name:"Información",subItems:[],navParams:['/services/info']}
    //   ],
    //   navParams:null
    // },
    { name:"Información de cuenta",
      icon:"info",
      type:"item",
      items:[
        {name:"Historial de pedidos",subItems:[],navParams:['/account_info/requests_history']},
        // {name:"Estado de cuenta",subItems:[],navParams:['/account_info/account_status']}
      ],
      navParams:null
    }
  ]
  public mobileItems = [
    { name:"Carrito de compras",
      icon:"shopping_cart",
      items:[],
      type: "item",
      navParams:['/shopping_cart']
    },
    { name:"",
      icon: null,
      items:[],
      type: "divider",
      navParams:null
    },
    { name:"Opciones de Usuario",
      icon: null,
      items:[],
      type: "divider-title",
      navParams:null
    },
    { name:"Ayuda",
      icon: "help",
      items:[],
      type: "item",
      navParams:null
    },
    { name:"Cerrar Sesión",
      icon: "undo",
      items:[],
      type: "item",
      navParams:['/login']
    },
  ]
  public itemsLists = [this.mainItems]

  public guestName:string;
  public guestRoom:string;

  constructor(private router: Router, private giStore: Store<GuestInfoState>) {}

  ngOnInit() {
    if (this.NavbarId == 'mobile-sidenav'){
      this.itemsLists.push(this.mobileItems);
    }


    this.giStore.select('guestInfo').subscribe((state) => {
      if(state['name'] && state['room']){
        let name = state['name'].split(" ")
        if(name.length == 4){
          this.guestName = name[0] + ' ' + name[2];
        }else if(name.length == 3){
          this.guestName = name[0] + ' ' + name[1]
        }else{
          this.guestName = state['name'];
        }
        this.guestRoom = state['room'];
      }
    });
  }

  onSelect(navParams){
    if (navParams != null){
      this.router.navigate(navParams)
    }
  }

}
