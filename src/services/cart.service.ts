import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 
 import { Cart,CartItem } from 'src/app/shared/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({items:[]});
  constructor() { }


  removeFromCart(item:CartItem){
  const filteredItem =     this.cart.value.items.filter((_item) => _item.productId != item.productId);
  this.cart.next({items:filteredItem});
  }

  addToCart(item:CartItem){
  const items = [... this.cart.value.items];
  const itemInCart = items.find((_item) =>  _item.productId===item.productId)
    
  if(itemInCart){
    itemInCart.quantity = itemInCart.quantity + 1;
    }else{
      items.push(item);
    }

    this.cart.next({items})
    //this._snackBar.open('1 items is added to cart','OK',{duration:3000});


  
  }
  clearCart(){
    this.cart.next({items:[]});
  }

  countElement(){
    return this.cart.value.items.length;
  }

  getTotal(items:Array<CartItem>){

    return items.map((item) => item.price * item.quantity).reduce((prev,current) => prev + current,0);
  }

  removeQuantityFromCart(item:CartItem){
    let itemForRemovel: CartItem | undefined;
    let filteredItems = this.cart.value.items.filter((_item) => {
      if(_item.productId === item.productId){
        _item.quantity--;
        if(_item.quantity === 0){
            itemForRemovel = _item;

        }
      }
      return _item;

    });
    if(itemForRemovel)
        this.removeFromCart(itemForRemovel);



  }
}
