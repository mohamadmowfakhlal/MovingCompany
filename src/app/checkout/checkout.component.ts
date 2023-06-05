import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms'
import { Customer } from '../shared/Customer';
import { Order } from '../shared/Order';
import { EmailValidator } from '../shared/email.validator';
import { loadStripe } from '@stripe/stripe-js';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { Product } from '../shared/Product';
import { Address } from '../shared/Address';
import { CartService } from 'src/services/cart.service';
import { Cart, CartItem } from '../shared/Cart';
import { LanguageService } from '../language.service';
import { TranslationService } from '../shared/TranslationService';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  errorMsg = '';
  productOrdered = new Map<string, Product>();
  selectedLanguage: any;
  pageDirection: any;
  product: any;

  userInformation = this._fb.group({
    fullName: [''],
    email: ['', []],
    phoneNumber: [''],
    city: ['', []],
    postCode: ['', []],
    streetName: ['', []],
    houseNumber: ['', []],
    deliveryDate: ['', []],
    shipping: [],
    note: []
  });
  displayedColumns: string[] = ['Product', 'price', 'quantity', 'total', 'action'];
  dataSource: Product[] = [];
  cart: Cart = { items: [] };
  OrderSummary: any;
  clearAll: any;
  quantity: any;
  price: any;
  totalPrice: any;
  fullName: any;
  email: any;
  phoneNumber: any;
  shippingAddress: any;
  city: any;
  postNumber: any;
  streetName: any;
  houseNumber: any;
  shippingMethod: any;
  shippingMethodByyourSelf: any;
  shippingMethodGLSPakkeShop: any;
  shippingMethodGLSHome: any;
  askToEnterInofmrationMessage: any;
  pickupDate: any;
  notes: any;
  checkout: any;
  note: any;
  // Convenience getter for easy access to form fields
  get f() { return this.userInformation.controls; }

  constructor(private _fb: FormBuilder,
    private _orderService: OrderService,
    private _cartService: CartService,
    private languageService: LanguageService) {
  }

  ngOnInit(): void {
    this._cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
      this.countTotal();
    })
    this.initlizeCMSLanguageText();
  }

  private initlizeCMSLanguageText() {
    this.languageService.language.subscribe((_language) => {
      this.selectedLanguage = _language;
      if (this.selectedLanguage == "English") {
        this.pageDirection = "ltr";
        this.OrderSummary = TranslationService.OrderSummaryEng;
        this.product = TranslationService.productEng;
        this.quantity = TranslationService.quantityEng;
        this.price = TranslationService.priceEng;
        this.totalPrice = TranslationService.totalPriceEng;
        this.clearAll = TranslationService.clearAllEng;
        this.fullName = TranslationService.fullNameEng;
        this.phoneNumber = TranslationService.phoneNumberEng;
        this.email = TranslationService.emailEng;
        this.shippingAddress = TranslationService.ShippingAddressEng;
        this.city = TranslationService.cityEng;
        this.postNumber = TranslationService.postNumberEng;
        this.houseNumber = TranslationService.postNumberEng;
        this.streetName = TranslationService.streetNameEng;
        this.shippingMethod = TranslationService.shippingMethodEng;
        this.shippingMethodByyourSelf = TranslationService.shippingMethodByyourSelfEng;
        this.shippingMethodGLSPakkeShop = TranslationService.shippingMethodGLSPakkeShopEng;
        this.shippingMethodGLSHome = TranslationService.shippingMethodGLSHomeEng;
        this.askToEnterInofmrationMessage = TranslationService.askToEnterInofmrationMessageEng;
        this.pickupDate = TranslationService.pickupDateEng;
        this.notes = TranslationService.notesEng;
        this.checkout = TranslationService.checkoutEng;
      } else if (this.selectedLanguage == "Danish") {
        this.pageDirection = "ltr";
        this.OrderSummary = TranslationService.OrderSummaryDan;
        this.product = TranslationService.productDan;
        this.quantity = TranslationService.quantityDan;
        this.price = TranslationService.priceDan;
        this.totalPrice = TranslationService.totalPriceDan;
        this.clearAll = TranslationService.clearAllDan;
        this.fullName = TranslationService.fullNameDan;
        this.phoneNumber = TranslationService.phoneNumberDan;
        this.email = TranslationService.emailDan;
        this.shippingAddress = TranslationService.ShippingAddressDan;
        this.city = TranslationService.cityDan;
        this.postNumber = TranslationService.postNumberDan;
        this.houseNumber = TranslationService.houseNumberDan;
        this.streetName = TranslationService.streetNameDan;
        this.shippingMethod = TranslationService.shippingMethodDan;
        this.shippingMethodByyourSelf = TranslationService.shippingMethodByyourSelfDan;
        this.shippingMethodGLSPakkeShop = TranslationService.shippingMethodGLSPakkeShopDan;
        this.shippingMethodGLSHome = TranslationService.shippingMethodGLSHomeDan;
        this.askToEnterInofmrationMessage = TranslationService.askToEnterInofmrationMessageDan;
        this.pickupDate = TranslationService.pickupDateDan;
        this.checkout = TranslationService.checkoutDan;
        this.notes = TranslationService.notesDan;
      } else {
        this.pageDirection = "rtl";
        this.OrderSummary = TranslationService.OrderSummaryAr;
        this.product = TranslationService.productAr;
        this.quantity = TranslationService.quantityAr;
        this.price = TranslationService.priceAr;
        this.totalPrice = TranslationService.totalPriceAr;
        this.clearAll = TranslationService.clearAllAr;
        this.fullName = TranslationService.fullNameAr;
        this.phoneNumber = TranslationService.phoneNumberAr;
        this.email = TranslationService.emailAr;
        this.shippingAddress = TranslationService.ShippingAddressAr;
        this.city = TranslationService.cityAr;
        this.postNumber = TranslationService.postNumberAr;
        this.houseNumber = TranslationService.houseNumberAr;
        this.streetName = TranslationService.streetNameAr;
        this.shippingMethod = TranslationService.shippingMethodAr;
        this.shippingMethodByyourSelf = TranslationService.shippingMethodByyourSelfAr;
        this.shippingMethodGLSPakkeShop = TranslationService.shippingMethodGLSPakkeShopAr;
        this.shippingMethodGLSHome = TranslationService.shippingMethodGLSHomeAr;
        this.askToEnterInofmrationMessage = TranslationService.askToEnterInofmrationMessageAr;
        this.pickupDate = TranslationService.pickupDateAr;
        this.checkout = TranslationService.checkoutAr;
        this.notes = TranslationService.notesAr;
      }
    });
  }

  removeProductOrder(item: CartItem) {
    this._cartService.removeFromCart(item);
  }

  total: number = 0;
  GLSHomeSelected: boolean = false;
  GLSPackageShopSelected: boolean = false;
  BringByYourSelfSelected: boolean = false;

  onClearCart() {
    this._cartService.clearCart();
  }

  countTotal() {
    this.total = this._cartService.getTotal(this.cart.items);
  }

  onRemoveQuantity(item: CartItem) {
    this._cartService.removeQuantityFromCart(item);
  }

  onAddQuantity(item: CartItem) {
    this._cartService.addToCart(item);
  }

  onCheckout() {
    this._orderService.onCheckout(this.cart.items).subscribe(
      async res => {
        let stripe = await loadStripe('pk_test_DKVtT5UpdVgNobvIqgpBYJOE');
        stripe?.redirectToCheckout({ sessionId: res.id });
        this.saveOrderInformation();
      },
      err => {
        console.error(err);
        this.errorMsg = err.statusText + ': ' + err.error.message;
      }
    );
  }
  saveOrderInformation() {
    if (!this.f.valid) {
      console.log('form error submitted' + this.f.errorMsg);
    }
    let address = new Address;
    let customer = new Customer(address, '', '', '');
    customer.fullName = this.f['fullName'].value;
    customer.email = this.f['email'].value;
    customer.phoneNumber = this.f['phoneNumber'].value;
    customer.address.city = this.f['city'].value;
    customer.address.postCode = this.f['postCode'].value;
    customer.address.streetName = this.f['streetName'].value;
    customer.address.houseNumber = this.f['houseNumber'].value;
    let deliveryDate = this.f['deliveryDate'].value;
    let note = this.f['note'].value;

    let order = new Order(customer, this.cart.items, deliveryDate, note);

    this._orderService.registerOrder(order)
      .subscribe(
        res => {
        },
        err => {
          console.error(err);
          this.errorMsg = err.statusText + ': ' + err.error.message;
        }
      );

  }
  shippingGLSHomeSelected: boolean = false;
  shippingGLSPackageShopSelected: boolean = false;
  /*
  shippingOption(e:any) {
    console.log(e.target.value);
  
    if(e.target.value =="GLSHome" && !this.shippingGLSHomeSelected){
      this.total = this.total + 59;
      this.shippingGLSHomeSelected = true;
      this.cart.items.push({ productId: 2, 
        quantity: 1 ,
        description: "",
        price: 59});
    }else if(e.target.value =="GLSPackageShop" && !this.shippingGLSPackageShopSelected){
        this.total = this.total + 39;
        this.shippingGLSPackageShopSelected = true;
        this.cart.items.push({ productId: 3, 
          quantity: 1 ,
          description: "",
          price: 39});
      } else if(e.target.value =="Bringyourself" && this.shippingGLSHomeSelected){
      this.total = this.total -59;
      this.shippingGLSHomeSelected = false;
    }  else if(e.target.value =="Bringyourself" && this.shippingGLSPackageShopSelected){
      this.total = this.total -39;
      this.shippingGLSPackageShopSelected = false;
    }
  }
  */
}
