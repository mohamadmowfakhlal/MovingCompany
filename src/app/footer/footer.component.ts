import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';
import { ResponsiveService } from '../responsive/responsive.service';
import { TranslationService } from '../shared/TranslationService';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  selectedLanguage:any;
  pageDirection:any;
  contactInformation:any;
  callus:any;
  email:any;
  services:any;
  about:any;
  terms:any;
  privacyPolicy:any;
  
  constructor(private languageService: LanguageService,public responsiveService:ResponsiveService) {

   }

  ngOnInit(): void {
    this.languageService.language.subscribe((_language) =>{
      this.selectedLanguage = _language;
      if(this.selectedLanguage=="English"){
        this.pageDirection = "ltr"
        this.contactInformation = TranslationService.contactInformationEng;
        this.callus = TranslationService.callusEng;     
        this.email = TranslationService.emailEng;    
        this.services = TranslationService.serviceEng;
        this.privacyPolicy = TranslationService.privacyPolicyEng;
        this.about = TranslationService.aboutEng;
        this.terms = TranslationService.termsEng

      }else if(this.selectedLanguage=="Danish") {
        this.pageDirection = "ltr"
        this.contactInformation = TranslationService.contactInformationDan;
        this.callus = TranslationService.callusDan;     
        this.email = TranslationService.emailDan;  
        this.services = TranslationService.serviceDan;
        this.privacyPolicy = TranslationService.privacyPolicyDan;
        this.about = TranslationService.aboutDan;
        this.terms = TranslationService.termsDan;
      }else{
        this.pageDirection = "rtl"
        this.contactInformation = TranslationService.contactInformationAr;
        this.callus = TranslationService.callusAr;     
        this.email = TranslationService.emailAr;    
        this.services = TranslationService.serviceAr;
        this.privacyPolicy = TranslationService.privacyPolicyAr;
        this.about = TranslationService.aboutAr;
        this.terms = TranslationService.termsAr;
      }
    });

 
      
  }

}
