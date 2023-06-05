import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  languages = ['English','Arabic','Danish'];
  valueFromSelect = 'English';
  language = new BehaviorSubject<string>(this.valueFromSelect);

  constructor() { }

  setvalueFromSelect(value:string){
    this.valueFromSelect = value;
    this.language.next(value);
  }
}
