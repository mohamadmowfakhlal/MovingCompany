import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/Product';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from 'src/services/product.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-managment',
  templateUrl: './product-managment.component.html',
  styleUrls: ['./product-managment.component.sass']
})
export class ProductManagmentComponent implements OnInit {
  productsList: Product[] = [];

  constructor(private _fb: FormBuilder,private _productService: ProductService,private _router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this.productsList = [];
  
    this._productService.getProducts().subscribe(
      res => {
        
        res.forEach((e: Product) => {
           this.productsList.push(e);
        }     
         
        );
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
          }
        }
      }
    ); 
  }
}
