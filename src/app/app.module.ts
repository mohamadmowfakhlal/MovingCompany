import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrderComponent } from './order/order.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product-Add/product.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{MatToolbarModule} from '@angular/material/toolbar';
import{MatIconModule} from '@angular/material/icon';
import{MatBadgeModule} from '@angular/material/badge';
import {MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table'  
import { CartService } from 'src/services/cart.service';
import { CategoryManagmentComponent } from './category-managment/category-managment.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ProductManagmentComponent } from './product-managment/product-managment.component';
import { MainPageForMovingCompanyComponent } from './main-page-for-moving-company/main-page-for-moving-company.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    SiteHeaderComponent,
    CheckoutComponent,
    HomeComponent,
    OrderComponent,
    FooterComponent,
    LoginComponent,
    ProductComponent,
    UploadImageComponent,
    CategoryManagmentComponent,
    CategoryListComponent,
    ProductManagmentComponent,
    MainPageForMovingCompanyComponent
    ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
   MatBadgeModule,
   MatCardModule,
   MatTableModule

  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
