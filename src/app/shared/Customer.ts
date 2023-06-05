import { Address } from "./Address";

export class Customer {
    constructor(
        public address: Address,
        public fullName?: string,
        public email?: string,
        public phoneNumber?: string,
             

    ) {
        this.fullName = fullName || '';
        this.email = email || '';
        this.phoneNumber = phoneNumber || '';
        this.address = address;
    }
}
