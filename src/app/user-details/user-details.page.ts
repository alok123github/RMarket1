import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit, OnDestroy {
  subscriber: any;

  constructor(private commonService: CommonServiceService,
    private router: Router,
    private fb: FormBuilder) { }
  orderList:any;

  user = {
    name: "",
    phone: "",
    village: "",
    landmark: ""
  }

  userDetails = this.fb.group({
    userName: [this.user.name],
    phone: [this.user.phone],
    village: [this.user.village],
    landmark: [this.user.landmark]
  })

  ngOnInit() {
    this.subscriber = this.commonService.getCheckoutProduct.subscribe(res => {
      console.log(res);
      this.orderList = res;
    })
  }

  placeOrder() {
    console.log(this.userDetails.value);
    console.log(this.orderList);

  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
