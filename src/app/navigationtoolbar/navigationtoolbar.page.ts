import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-navigationtoolbar',
  templateUrl: './navigationtoolbar.page.html',
  styleUrls: ['./navigationtoolbar.page.scss'],
})
export class NavigationtoolbarPage implements OnInit {

  constructor(private router: Router,
    private loadCtrl: LoadingController,
    private http: HttpClient,
    private commonService: CommonServiceService) { }

  cartCount=0;

  ngOnInit() {
    this.commonService.getCartCount.subscribe(res=>{
      this.cartCount=res;
    });
  }

  gotoCart() {
    console.log('cart')
    this.router.navigateByUrl('/cart');
  }

}
