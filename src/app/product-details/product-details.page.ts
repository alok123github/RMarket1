import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  constructor(private commonService: CommonServiceService) { }
  productData:any;

  ngOnInit() {
    this.commonService.getProdDetails.subscribe(data=>{
      this.productData = data;
    })
    
  }

}
