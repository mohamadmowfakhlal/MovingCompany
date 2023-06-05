import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product-Add/product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CategoryManagmentComponent } from './category-managment/category-managment.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ProductManagmentComponent } from './product-managment/product-managment.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'order',
    component: OrderComponent
  }
  ,
  {
    path: 'productList',
    component: ProductManagmentComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'category',
    component: CategoryManagmentComponent
  },
  {
    path: 'categoryList',
    component: CategoryListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
   component:HomeComponent
  }


   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
