import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { Category } from '../shared/Category';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.sass']
})
export class CategoryListComponent implements OnInit {
  prodcutsCategory: Category[] = [];

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this._productService.getCategory().subscribe(
      res => {
        
        res.forEach((e: Category) => {
          this.prodcutsCategory.push(e);
        });
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
          }
        }
      }
    ); 
  }
}
