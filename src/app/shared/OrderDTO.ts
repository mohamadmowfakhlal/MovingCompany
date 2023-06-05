
export class OrderDTO {
    constructor(
        public nameEng: string,public quantity:number,public orderId: Number,
        public phoneNumber: string,public paid: Number,public deliveryDate: Date,public fullName:string,
        public city:string,public streetName:string,public houseNumber: string,public note:string) {
        this.nameEng = nameEng;
        this.quantity = quantity;
        this.orderId = orderId;
        this.paid = paid;
        this.deliveryDate = deliveryDate
        this.fullName = fullName;
        this.city = city;
        this.streetName = streetName
        this.houseNumber = houseNumber
        this.note = note;
    }
}

