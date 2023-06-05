import { Customer } from "./Customer";
import { Product } from "./Product";

export class Order {
    constructor(
        public customer?: Customer, public productsOrdered?: Array<Product>,public deliveryDate?:Date,public note?:string) {
        this.customer = customer;
        this.productsOrdered = productsOrdered;
        this.deliveryDate = deliveryDate;
        this.note = note;
    }
}

