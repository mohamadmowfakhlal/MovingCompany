import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../shared/Product';
import { Category } from '../shared/Category';
import { ResponsiveService } from '../responsive/responsive.service';
import { LanguageService } from '../language.service';
import { Router } from '@angular/router';
import { TranslationService } from '../shared/TranslationService';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  isVisible = false; // whenever you need to hide an element

  productsList: Product[] = [];

  prodcutsCategory: Category[] = [];
  mobileButtonVisible:boolean = false;
  @Output() AddToCart = new EventEmitter<Product>();
  MaxNumberOfProductsInRow: number = 3;
  selectedLanguage:any;
  pageDirection:any;
  constructor(private _productService: ProductService,
              public _responsiveService:ResponsiveService,
              private _languageService: LanguageService,
              private _router:Router) {
   }
   popularProducts:any;
  ngOnInit(): void {
    
    this.getProducts();
    this.getCategories();
  
    this.setNumberOfProductsInRow(); 
   
    this._languageService.language.subscribe((_language) =>{
      this.selectedLanguage = _language;
      if(this.selectedLanguage=="English"){
        this.pageDirection = "ltr";
        this.popularProducts = TranslationService.popularProductsEng;
        

      }else if(this.selectedLanguage=="Danish") {
        this.pageDirection = "ltr";
        this.popularProducts = TranslationService.popularProductsDan;

      }else{
        this.pageDirection = "rtl";
        this.popularProducts = TranslationService.popularProductsAr;

      }
    });
  }

  private setNumberOfProductsInRow() {
    switch (this._responsiveService.deviceType) {

      case "Web": {
        this.MaxNumberOfProductsInRow = 3;
        break;
      }
      case "Handset": {
        this.MaxNumberOfProductsInRow = 1;
        this.mobileButtonVisible = true;
        break;
      }

      case "Tablet": {
        this.MaxNumberOfProductsInRow = 2;
        break;
      }
      default: {
        this.MaxNumberOfProductsInRow = 3;
        break;
      }
    }
  }

  Basket(){
    this._router.navigate(['/checkout']);
  }

  getCategories() {
    this.prodcutsCategory = [];
    this._productService.getCategories().subscribe(
      categories => {        
        categories.forEach((category: Category) => {
          this.prodcutsCategory.push(category);
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

  onAddToCard(product: Product){
    this.AddToCart.emit(product);
    }

buildProductsTable(productsList: Product[]): Product[][]{
    var productsListSquare = [];
    for(var i = 0; i < productsList.length ; i+=this.MaxNumberOfProductsInRow) {
        var rowsOfProducts = [];

        for(var j = 0; j < this.MaxNumberOfProductsInRow; j++) {
          var product = productsList[i + j];
            if (!product) {
                break;
            }
            rowsOfProducts.push(product);
        }
        productsListSquare.push(rowsOfProducts);
    }
     return productsListSquare;
}


  getProducts(){
    this.productsList = [];

    this._productService.getProducts().subscribe(
      products => {
        
        products.forEach((product: Product) => {
           this.productsList.push(product);
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

  getProductsForCategories(categoryId:String){
    this.productsList = [];
    this._productService.getProductsForCategories(Number(categoryId)).subscribe(
      products => {
        
        products.forEach((product: Product) => {
          this.productsList.push(product);
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

}
