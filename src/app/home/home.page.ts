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

  productAllForCart:any;
  cartCount = 0;
  cartSub: any;
  cartSub1: any;

  constructor(private router: Router,
    private loadCtrl: LoadingController,
    private http: HttpClient,
    private commonService: CommonServiceService) { }
  productAll: any;


  ngOnInit() {
    this.commonService.getAllCat.subscribe(result => {
      if (result) {
        this.allCategory = result;
      }
      else
        this.getCategory();
    })

    this.commonService.getAllProd.subscribe(res => {
      if (res) {
        this.productAll = res;
      }
      else
        this.getProducts();
    })

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
      this.commonService.getAllCategory(this.allCategory);
      console.log(this.allCategory);
    }), err => {
      this.loading.dismiss();
      alert('Something went wrong...');
    }
  }

  gotoCategoryWiseProducts(category) {
    this.showLoading();
    this.http.get('https://rbazarapi.herokuapp.com/product').subscribe(data => {
      this.categoryProducts = [];
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

  getPopularProducts() {
    this.commonService.getAllCat.subscribe(res => {
      console.log(res);
    })
  }

  getProducts() {
    this.http.get('https://rbazarapi.herokuapp.com/product').subscribe(data => {
      this.productAll = data;
      this.productAll = this.productAll.productData;
      this.commonService.getAllProducts(this.productAll);
      console.log(this.productAll);
    })
  }

  

  addCart(cartItem, plusMinus) {
    console.log(plusMinus);
    this.cartSub = this.commonService.getAllProd.subscribe(res => {
      if (res) {
        for (let p of res) {
          if (p._id === cartItem) {
            if (plusMinus === 'plus') {
              if (p.count) {
                p.count++;
              }
              else
                p.count = 1;
            }
            if (plusMinus === 'minus') {
              if (p.count >= 1) {
                p.count--;
              }
              else
                p.count = 0;

            }
          }
        }
      }
    })

    this.cartSub1 = this.commonService.getAllProd.subscribe(res => {
      this.cartCount=0;
      if (res) {
        this.productAllForCart = res;
        for (let p of this.productAllForCart) {
          if (p.count) {
            this.cartCount+=p.count;
          }
        }
        console.log(this.cartCount);
      }
      else
        this.cartCount = 0;
      this.commonService.setCartCountData(this.cartCount);
    })

    if(this.cartSub || this.cartSub1)
    {
      this.cartSub.unsubscribe();
      this.cartSub1.unsubscribe();
    }

    // this.commonService.getAllProd.subscribe(rr => {
    //   console.log(rr);
    // })
  }

  buyProduct(productId) {
    this.showLoading();
    console.log(productId)
    this.http.get('https://rbazarapi.herokuapp.com/product/' + productId).subscribe(data => {

      console.log(data);
      this.commonService.setProductDetailsData(data);
      this.loading.dismiss();
    })
    this.router.navigateByUrl('/product-details');
  }

  gotoCart(){
    console.log('cart')
    this.router.navigateByUrl('/cart');
  }


}
