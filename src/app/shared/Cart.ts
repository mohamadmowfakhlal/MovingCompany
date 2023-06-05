
export interface Cart{
    items: Array<CartItem>;
}

export interface CartItem {
 productId?: Number, 
  quantity: number ,
  productName?: string,
  description?: string,
  price: number,
  imageName?:string,
  categoryId?:Number


}

