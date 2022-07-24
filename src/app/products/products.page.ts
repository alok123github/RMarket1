import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ModalController } from '@ionic/angular';
import { EditModalPage } from '../edit-modal/edit-modal.page';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor(private http: HttpClient,
    private loadCtrl: LoadingController,
    private modalCtrl: ModalController,
    private commonService: CommonServiceService) { }
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



}
