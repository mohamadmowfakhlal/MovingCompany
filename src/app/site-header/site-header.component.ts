import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/services/cart.service';
import { LanguageService } from '../language.service';
import { TranslationService } from '../shared/TranslationService';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {
  languages :string[]=[];
  @Output() languageEmitter = new EventEmitter<string>();
  pageDirection:any;
  valueFromSelect = "English";
  contactus:any;
  welcome:any;

  constructor(private _router: Router,private _cartService: CartService,private languageService: LanguageService) {
   }

  ngOnInit(): void {
    this.contactus = TranslationService.contactusEng;
    this.welcome = TranslationService.welocmeEng;       
    this.languages = [...this.languageService.languages];

  }

  onSelect() {
    this.languageService.setvalueFromSelect(this.valueFromSelect);
    this.languageEmitter.emit(this.valueFromSelect);

    if(this.valueFromSelect=="English"){
      this.contactus = TranslationService.contactusEng;
      this.welcome = TranslationService.welocmeEng;
      this.pageDirection = "ltr";

    }else if (this.valueFromSelect=="Danish"){
      this.contactus =   TranslationService.contactusDan;
      this.welcome =   TranslationService.welcomeDan;
      this.pageDirection = "ltr";


    }else{
      this.contactus = TranslationService.contactusAr;
      this.welcome = TranslationService.welcomeAr;
      this.pageDirection = "rtl";


    }
    //window.location.reload(); 

  }

  countProduct(){

    return this._cartService.countElement();
  }
  Basket(){
    this._router.navigate(['/checkout']);
  }
  Login(){
    this._router.navigate(['/login']);
  
  }

}
