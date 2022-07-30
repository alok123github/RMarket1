import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(private commonService: CommonServiceService) { }
  productAll: any;
  cart: number = 0;
  cartItems: any=[];

  ngOnInit() {
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

  productAllForCart:any;
  cartCount = 0;
  aa(){
    this.commonService.getAllProd.subscribe(res => {
      if (res) {
        this.productAllForCart = res;
        for (let p of this.productAllForCart) {
          if (p.count) {
            this.cartCount+=p.count;
          }
        }
        console.log(this.cart);
        console.log(this.cartItems);
      }
      else
        this.cart = 0;
    })
  }

}
