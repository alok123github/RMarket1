import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnimationController, LoadingController, ModalController } from '@ionic/angular';
import { EditModalPage } from '../edit-modal/edit-modal.page';
import { CommonServiceService } from '../common-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor(private http: HttpClient,
    private loadCtrl: LoadingController,
    private modalCtrl: ModalController,
    private commonService: CommonServiceService,
    private router: Router,
    private animationCtrl:AnimationController) { }
  product: any;
  loading: any;
  editModal: any;

  ngOnInit() {
    this.commonService.getAllProd.subscribe(res => {
      if (res) {
        this.product = res;
      }
      else
        this.getProducts();
    })

  }

  getProducts() {
    this.showLoading();
    this.http.get('https://rbazarapi.herokuapp.com/product').subscribe(data => {
      this.product = data;
      this.product = this.product.productData;
      this.commonService.getAllProducts(this.product);
      console.log(this.product);
      this.loading.dismiss();
    })
  }

  deleteProduct(id: any) {
    this.showLoading();
    let deleteUrl = "https://rbazarapi.herokuapp.com/product/" + id;
    console.log(deleteUrl);
    this.http.delete(deleteUrl).subscribe((ok) => {
      this.loading.dismiss();
      alert("Deleted Successfully!");
      this.getProducts();
    })

  }

  async updateProduct(id: any) {
    this.editModal = await this.modalCtrl.create({
      component: EditModalPage,
      cssClass: "modalClass",
      componentProps: ({
        'id': id
      })
    });

    this.editModal.present();
    // let updateUrl=
  }

  async showLoading() {
    this.loading = await this.loadCtrl.create({
      message: "Please wait..."
    })
    this.loading.present();
  }

  addCart(cartItem,plusMinus){
    console.log(plusMinus);
    this.commonService.getAllProd.subscribe(res => {
      if (res) {
        for(let p of res){
          if(p._id===cartItem){
            if(plusMinus === 'plus'){
              if(p.count){
                p.count++;
              }
              else
              p.count = 1;
            }
            if(plusMinus === 'minus'){
              if(p.count>=1){
                p.count--;
              }
              else
              p.count = 0;
              
            }
          }
        }
      }
    })

    this.commonService.getAllProd.subscribe(rr=>{
      console.log(rr);
    })
  }

  buyProduct(productId){
    this.showLoading();
    console.log(productId)
    this.http.get('https://rbazarapi.herokuapp.com/product/'+productId).subscribe(data => {
      
      console.log(data);
      this.commonService.setProductDetailsData(data);
      this.loading.dismiss();
    })
    this.router.navigateByUrl('/product-details');
  }

  ionViewDidEnter() {
    let delay:number = 0;
    const arr = document.querySelectorAll('.list');
    console.log(arr.length);

    for(let i=0;i<this.product.length;i++){
      const animation = this.animationCtrl.create()
      .addElement(arr[i])
      .duration(200)
      .iterations(1)
      .delay(delay)
      .keyframes([
        { offset: 0, transform: 'translateY(30px)', opacity: '0.6' },
        { offset: 1, transform: 'translateY(0px)', opacity: '1' }
      ]);
      delay+=200;

    animation.play();

    }

    
  }



}
