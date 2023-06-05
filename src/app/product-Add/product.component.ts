import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Category } from '../shared/Category';
import { Product } from '../shared/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productDetails = new Product(0,0,0,'','','');

  errorMsg = '';
  prodcutsCategory: Category[] = [];

  constructor(private _fb: FormBuilder,private _productService: ProductService,private _router: Router) { }
  product = this._fb.group({
    nameEng: ['', []],
    nameDan: ['', []],
    nameAr: ['', []],
    description: ['',],
    price: ['',],
    categoryId : ['',],
  });



    // Convenience getter for easy access to form fields
    get f() { return this.product.controls; }


  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._productService.getCategory().subscribe(
      res => {
        
        res.forEach((e: Category) => {
          this.prodcutsCategory.push(e);
        });
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
          }
        }
      }
    ); 
  }
 
  saveProduct(){
    this.productDetails.nameEng = this.f['nameEng'].value;
    this.productDetails.nameDan = this.f['nameDan'].value;
    this.productDetails.nameAr = this.f['nameAr'].value;
    this.productDetails.price = this.f['price'].value;
    this.productDetails.description = this.f['description'].value;
    this.productDetails.categoryId = this.f['categoryId'].value;
    this._productService.registerProduct(this.productDetails).subscribe(
      res => {
        this._router.navigate(['/productList']);        
      },
      err => {
        console.error(err);
        this.errorMsg = err.statusText + ': ' + err.error.message;  // Bind the error to a property, and then bind this to the html
      }
    ); 
  }
}
