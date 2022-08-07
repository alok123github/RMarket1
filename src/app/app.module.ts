import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePage } from './home/home.page';
import { ProductsPage } from './products/products.page';
import { LoginPage } from './login/login.page';
import { HttpClientModule } from '@angular/common/http';
import { AddProductPage } from './add-product/add-product.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditModalPage } from './edit-modal/edit-modal.page';
import { CommonServiceService } from './common-service.service';
import { CategoryWiseProductsPage } from './category-wise-products/category-wise-products.page';
import { CartPage } from './cart/cart.page';
import { NavigationtoolbarPage } from './navigationtoolbar/navigationtoolbar.page';
import { ProductDetailsPage } from './product-details/product-details.page';

@NgModule({
  declarations: [AppComponent,HomePage,ProductsPage,LoginPage,AddProductPage,EditModalPage,CategoryWiseProductsPage,CartPage,NavigationtoolbarPage,ProductDetailsPage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,FormsModule,ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },CommonServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
