import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  constructor(private commonService: CommonServiceService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private alertController: AlertController) { }
  
  tempOrders:any;

  ngOnInit() {
    this.getOrders();
    
  }

  getOrders(){
    this.http.get('https://rbazarapi.herokuapp.com/order/').subscribe(res=>{
      console.log(res);
      this.tempOrders = res;
      this.tempOrders=this.tempOrders.orderData;
    })
  }

  deleteOrder(id){
    console.log(id);
  }

}
