import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Order } from '../app/shared/Order';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _OrderAPI = environment.link + ":3000/api/order";

  private _checkoutAPI = environment.link + ":3000/checkout";               

  constructor(private http: HttpClient,
              private _router: Router) { }  // Inject it

  errorHandler(err: HttpErrorResponse) {
    return throwError(err);  // Throw the error to components which have subscribed to this service
  }
  
  registerOrder(order: Order) {
    return this.http.post<any>(this._OrderAPI, order)  // Either an error, or details of the user
      .pipe(catchError(this.errorHandler))  // Catch the error
  }

  onCheckout(itemss:Array<any>){
    return this.http.post<any>(this._checkoutAPI, {items:itemss})  // Either an error, or details of the user
      .pipe(catchError(this.errorHandler))  // Catch the error
  }

  getOrders(date?:string) {
    let orderAPI = this._OrderAPI + "?deliveryDate=" + date;
    return this.http.get<any>(orderAPI)  // Either an error, or details of the products
      .pipe(catchError(this.errorHandler))  // Catch the error  }
  }

}
