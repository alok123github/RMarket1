import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AddProductPage } from './add-product/add-product.page';
import { CartPage } from './cart/cart.page';
import { CategoryWiseProductsPage } from './category-wise-products/category-wise-products.page';
import { EditModalPage } from './edit-modal/edit-modal.page';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { ProductDetailsPage } from './product-details/product-details.page';
import { ProductsPage } from './products/products.page';
import { UserDetailsPage } from './user-details/user-details.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'cart',
    component: CartPage
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'products',
    component: ProductsPage
  },
  {
    path: 'add-product',
    component: AddProductPage
  },
  {
    path: 'edit-modal',
    component: EditModalPage
  },
  {
    path: 'category-wise-products',
    component: CategoryWiseProductsPage
  },
  {
    path: 'product-details',
    component:ProductDetailsPage
  },
  {
    path: 'user-details',
    component: UserDetailsPage
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
