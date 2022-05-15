import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  allCategory: any;
  loading: any;
  categoryProducts = [];
  product: any;

  constructor(private router: Router,
    private loadCtrl: LoadingController,
    private http: HttpClient,
    private commonService:CommonServiceService) { }


  ngOnInit() {
    this.getCategory();
  }

  gotoProducts() {
    this.router.navigateByUrl('/products');
    console.log('products page');
  }

  addProduct() {
    this.router.navigateByUrl('/add-product');
  }

  async showLoading() {
    this.loading = await this.loadCtrl.create({
      message: "Please wait..."
    })
    this.loading.present();
  }

  getCategory() {
    this.showLoading()
    this.http.get('https://rbazarapi.herokuapp.com/category/').subscribe(res => {
      this.loading.dismiss();
      this.allCategory = res;
      this.allCategory = this.allCategory.categoryData;
      console.log(this.allCategory);
    }), err => {
      this.loading.dismiss();
      alert('Something went wrong...');
    }
  }

  // gotoCategoryWiseProducts(category) {
  //   this.getProducts();
  //   console.log(this.product);
  // for(let p of this.product){
  //   if(p===category){
  //     this.categoryProducts.push(p);
  //   }
  // }
  // console.log(this.categoryProducts);
  // }

  gotoCategoryWiseProducts(category) {
    this.showLoading();
    this.http.get('https://rbazarapi.herokuapp.com/product').subscribe(data => {
      this.categoryProducts=[];
      this.product = data;
      this.product = this.product.productData;
      for (let p of this.product) {
        console.log(p.category)
        if (p.category === category) {
          this.categoryProducts.push(p);
        }

      }
      console.log(this.categoryProducts);
      this.commonService.postCatWiseProduct(this.categoryProducts);
      this.loading.dismiss();
    })
    this.router.navigateByUrl('/category-wise-products');
  }


}
