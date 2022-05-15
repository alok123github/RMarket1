import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-category-wise-products',
  templateUrl: './category-wise-products.page.html',
  styleUrls: ['./category-wise-products.page.scss'],
})
export class CategoryWiseProductsPage implements OnInit {

  constructor(private commonService:CommonServiceService) { }
  product:any;

  ngOnInit() {
    this.commonService.categoryWiseGetProduct.subscribe(res=>{
      this.product=res;
    });
  }

  buyNow(productId) {
    console.log(this.product);
  }

}
