import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(private commonService: CommonServiceService,
    private router:Router) { }
  
  productAll: any;
  cart: number = 0;
  cartItems: any=[];
  i=0;

  productAllForCart:any;
  cartCount = 0;
  cartTemp:any;

  cartSub: any=[];
  cartSub1: any=[];

  ngOnInit() {
    this.commonService.getCartCount.subscribe(res=>{
      this.cartTemp=res;
    });

    this.commonService.getAllProd.subscribe(res => {
      if (res) {
        this.productAll = res;
        for (let p of this.productAll) {
          if (p.count) {
            this.cartItems.push(p);
            this.cart+=p.count;
          }
        }
        console.log(this.cart);
        console.log(this.cartItems);
      }
      else
        this.cart = 0;
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
    
  }

  gotoProducts(){
    this.router.navigateByUrl('/products');
  }

  checkout(){
    let tempCart=[];
    this.commonService.getAllProd.subscribe(res => {
      if (res) {
        this.productAll = res;
        for (let p of this.productAll) {
          if (p.count && p.count>=1) {
            tempCart.push(p);
          }
        }
      }
    })
    console.log(tempCart);
  }

  // ngOnDestroy(): void {
  //   for(let i=0;i<this.i;i++){
  //     this.cartSub[i].su
  //   }
  // }

}
