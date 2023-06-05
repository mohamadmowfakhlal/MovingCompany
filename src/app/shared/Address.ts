
export class Address {
    constructor(
        public city?: string,
        public postCode?: string,
        public streetName?: string,
        public houseNumber?: string,
        

    ) {
        this.postCode = postCode || '';
        this.city = city || '';
        this.streetName = streetName || '';
        this.houseNumber = houseNumber || '';
    }
}
