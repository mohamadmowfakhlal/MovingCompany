import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Product } from '../app/shared/Product';
import { Category } from 'src/app/shared/Category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Create properties which store the backend APIs
  private _BackendAPI = environment.link + ":3000/api";
  //private _BackendAPI = "http://localhost:3000/api";
  //private _BackendAPI = "http://52.28.147.250:3000/api";
           

  constructor(private http: HttpClient,
              private _router: Router) { }  // Inject it

  errorHandler(err: HttpErrorResponse) {
    return throwError(err);  // Throw the error to components which have subscribed to this service
  }
  
  registerProduct(productDetails: Product) {
    let productAPI = this._BackendAPI + "/products";
    return this.http.post<any>(productAPI, productDetails)  // Either an error, or details of the user
      .pipe(catchError(this.errorHandler))  // Catch the error
      }

      registerCategory(categoryDetails:Category){
        let productAPI = this._BackendAPI + "/category";
        return this.http.post<any>(productAPI, categoryDetails)  // Either an error, or details of the user
          .pipe(catchError(this.errorHandler))  // Catch the error


      }

  getProducts() {
    let productAPI = this._BackendAPI + "/products";
    return this.http.get<any>(productAPI)  // Either an error, or details of the products
      .pipe(catchError(this.errorHandler))  // Catch the error 
  }

  getProductsForCategories(categoryId:number) {    
    this._router.navigate(['/']);
    let productAPI = this._BackendAPI + "/products/category" + "?categoryId=" + categoryId;
    return this.http.get<any>(productAPI)  // Either an error, or details of the products
      .pipe(catchError(this.errorHandler))  // Catch the error getProductsForCategories
  }

  getCategories() {
    let categoryAPI = this._BackendAPI + "/category";
    return this.http.get<any>(categoryAPI)  // Either an error, or details of the products
      .pipe(catchError(this.errorHandler))  // Catch the error
  }

  getCategory(){
    let categoryAPI = this._BackendAPI + "/category";
    return this.http.get<any>(categoryAPI)  // Either an error, or details of the products
      .pipe(catchError(this.errorHandler))  // Catch the error
  }
}
