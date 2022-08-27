import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit,OnDestroy {

  constructor(private commonService: CommonServiceService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private alertController: AlertController,
    private loadCtrl:LoadingController) { }
  
  tempOrders:any;
  loading:any;
  subscriberOrder:any;

  ngOnInit() {
    this.getOrders();
    
  }

  getOrders(){
    this.showLoading();
    this.subscriberOrder = this.http.get('https://rbazarapi.herokuapp.com/order/').subscribe(res=>{
      console.log(res);
      this.tempOrders = res;
      this.tempOrders=this.tempOrders.orderData;
      this.loading.dismiss();
    })
  }

  deleteOrder(id){
    console.log(id);
  }

  async showLoading() {
    this.loading = await this.loadCtrl.create({
      message: "Please wait..."
    })
    this.loading.present();
  }

  ngOnDestroy(): void {
    this.subscriberOrder.unsubscribe();
  }

}
