
export class Product {
    constructor(
        public price: number,
         public productId?: Number, public quantity?: Number,
         public nameEng?: string, public nameDan?:string,public nameAr?: string, 
         public description?: string,public imageName?:string,public categoryId?:Number) {

        this.productId = productId;
        this.nameEng = nameEng;
        this.nameDan = nameDan;
        this.nameAr = nameAr;
        this.quantity = quantity;
        this.price = price;
        this.imageName = imageName;
        this.description = description;

    }


}

