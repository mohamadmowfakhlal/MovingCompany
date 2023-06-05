import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { OrderDTO } from '../shared/OrderDTO';
import { Product } from '../shared/Product';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderProducts = new Map<Number, Product[]>();

  ordersList: OrderDTO[] = [];

  constructor(private _orderService: OrderService,private _router: Router) {

   }

  ngOnInit(): void {
    this.getOrders("");

  }

  searchOrder(deliveryDate:string){
    this.ordersList=[];
    this.getOrders(deliveryDate);
  }
  
  productMagament(){
    this._router.navigate(['/product']);

  }
  cateogryMagament(){
    this._router.navigate(['/category']);

  }
getOrders(date?:string){

  if(date){
     date = this.formatDate(date);
  }
    this._orderService.getOrders(date).subscribe(
      orders => {
        orders.forEach((orderDTO: OrderDTO) => {
          this.OrderDTOMapper(orderDTO)
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

formatDate(date:any) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

OrderDTOMapper(order:OrderDTO){
  let quantity = order.quantity; 
  let nameEng = order.nameEng;
  let product = new Product(0,undefined,quantity,nameEng,'','');


    if(!this.orderProducts.has(order.orderId))
      this.ordersList.push(order);

    let ExistorderProduct = this.orderProducts.get(order.orderId)
    if(ExistorderProduct == null){
            let orderProducts: Product[] = [];
            orderProducts.push(product);
            this.orderProducts.set(order.orderId,orderProducts);
    }else{
            ExistorderProduct.push(product);
            this.orderProducts.set(order.orderId,ExistorderProduct);
        
    }
}

getProductsForOrder(orderId:any){

return this.orderProducts.get(orderId);

}
}


