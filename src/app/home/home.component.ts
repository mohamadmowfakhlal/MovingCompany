import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { ResponsiveService } from '../responsive/responsive.service';
import { Product } from '../shared/Product';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _cartService:CartService,public responsiveService:ResponsiveService) { }

  ngOnInit(): void {
  }
  onAddToCard(product:Product){
    this._cartService.addToCart({
      price :product.price,
      productName : product.nameEng,
      quantity : 1,
      productId :product.productId,
      imageName : product.imageName
    });
  }
}
