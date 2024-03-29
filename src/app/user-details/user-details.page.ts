import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit, OnDestroy {
  subscriber: any;
  loading:any;

  constructor(private commonService: CommonServiceService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private alertController: AlertController,
    private loadCtrl:LoadingController) { }
  orderList:any;
  tempMessage:any;

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
    this.getOrderList();
    
  }

  getOrderList(){
    this.subscriber = this.commonService.getCheckoutProduct.subscribe(res => {
      console.log(res);
      this.orderList = res;
    })
  }

  placeOrder() {
    this.showLoading();
    let tempOrder={
      userData:this.userDetails.value,
      orderData:this.orderList
    }
    console.log(tempOrder);

    this.http.post('https://rbazarapi.herokuapp.com/order/', tempOrder).subscribe(res=>{
      console.log(res);
      this.tempMessage = res;
      this.tempMessage=this.tempMessage.message;
      this.loading.dismiss();
      this.presentAlert(this.tempMessage);
    })

  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: message,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigateByUrl('/home');
          },
        },
      ],
    });

    await alert.present();
  }

  async showLoading() {
    this.loading = await this.loadCtrl.create({
      message: "Please wait..."
    })
    this.loading.present();
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
