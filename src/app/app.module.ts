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

@NgModule({
  declarations: [AppComponent,HomePage,ProductsPage,LoginPage,AddProductPage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
