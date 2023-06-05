import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-main-page-for-moving-company',
  templateUrl: './main-page-for-moving-company.component.html',
  styleUrls: ['./main-page-for-moving-company.component.sass']
})
export class MainPageForMovingCompanyComponent implements OnInit {

  constructor(private _languageService: LanguageService) { }
  pageDirection:any;
  selectedLanguage:any;

  ngOnInit(): void {
    this._languageService.language.subscribe((_language) =>{
      this.selectedLanguage = _language;
      if(this.selectedLanguage=="English"){
        this.pageDirection = "ltr";
        

      }else if(this.selectedLanguage=="Danish") {
        this.pageDirection = "ltr";

      }else{
        this.pageDirection = "rtl";

      }
    });
  }

}
