import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductService } from 'src/services/product.service';
import { Category } from '../shared/Category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-managment',
  templateUrl: './category-managment.component.html',
  styleUrls: ['./category-managment.component.sass']
})
export class CategoryManagmentComponent implements OnInit {

  constructor(private _fb: FormBuilder,private _productService: ProductService,private _router: Router) { }

  ngOnInit(): void {
  }
  cateogry = this._fb.group({
    categoryNameEng: ['', []],
    categoryNameAr: ['',],
    categoryNameDan: ['',],
  });
  errorMsg = '';

    // Convenience getter for easy access to form fields
    get fCategory() { return this.cateogry.controls; }

    categoryDetails = new Category(0,'','','');

    saveCategory(){
      this.categoryDetails.categoryNameEng = this.fCategory['categoryNameEng'].value;
      this.categoryDetails.categoryNameDan = this.fCategory['categoryNameDan'].value;
      this.categoryDetails.categoryNameAr = this.fCategory['categoryNameAr'].value;
  
      this._productService.registerCategory(this.categoryDetails).subscribe(
        res => {
          this._router.navigate(['/categoryList']);

          
        },
        err => {
          console.error(err);
          this.errorMsg = err.statusText + ': ' + err.error.message;  // Bind the error to a property, and then bind this to the html
        }
      ); 
  
    }
}
