
export class Category {
    constructor(
        public categoryId?: number ,              

        public categoryNameEng?: string, 
        public categoryNameDan?: string, 
        public categoryNameAr?: string

    ) {
        this.categoryNameEng = categoryNameEng || '';
        this.categoryId = categoryId;
    }
}
