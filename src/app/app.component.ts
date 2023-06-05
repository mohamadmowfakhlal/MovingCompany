import { Component, OnInit } from '@angular/core';
import { Cart } from './shared/Cart';
import { CartService } from '../services/cart.service';
import { ResponsiveService } from './responsive/responsive.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'shamFood';
  cart: Cart = {items:[]};

  constructor(private _cartService: CartService,public responsiveService:ResponsiveService){

  }
  ngOnInit(): void {
    this._cartService.cart.subscribe((_cart) =>{
      this.cart = _cart;

    })
  }

}
