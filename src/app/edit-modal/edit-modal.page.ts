import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.page.html',
  styleUrls: ['./edit-modal.page.scss'],
})
export class EditModalPage implements OnInit {

  @Input() id: any;

  constructor(private fb: FormBuilder, private http: HttpClient,
    private loadCtrl: LoadingController, private modalCtrl: ModalController) { }

  loading: any;
  productData: any;
  ngOnInit() {
    this.getProductData();
  }

  product = {
    name: "",
    category: "",
    description: "",
    price: "",
    seller: "",
    imagepath: "",
    cloudinaryid: "",
    photos: ""
  }

  productFill = this.fb.group({
    productName: [this.product.name],
    category: [this.product.category],
    desc: [this.product.description],
    price: [this.product.price],
    seller: [this.product.seller],
    imagePath: [''],
    cloudinary_id: ['']
  })

  getProductData() {
    this.showLoading();
    let fetchOneDataUrl = "https://rbazarapi.herokuapp.com/product/" + this.id;
    this.http.get(fetchOneDataUrl).subscribe(data => {
      this.productData = data;
      this.product.name = this.productData.productData.productName;
      this.product.category = this.productData.productData.category;
      this.product.description = this.productData.productData.desc;
      this.product.price = this.productData.productData.price;
      this.product.seller = this.productData.productData.seller;
      this.product.imagepath = this.productData.productData.imagePath;
      this.product.cloudinaryid = this.productData.productData.cloudinary_id;
      // console.log(this.productData);
      this.loading.dismiss();
    }), err => {
      this.loading.dismiss();
      alert("Something went wrong...");
    }
  }

  async showLoading() {
    this.loading = await this.loadCtrl.create({
      message: "Please wait..."
    })
    this.loading.present();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  updateProduct() {
    this.showLoading();
    console.log(this.productFill.value);
    let updateUrl = "https://rbazarapi.herokuapp.com/product/" + this.id;
    this.http.put(updateUrl,this.productFill.value).subscribe(data=>{
      this.loading.dismiss();
      this.closeModal();
      window.location.reload();
    }),err=>{
      this.loading.dismiss();
      alert("Something went wrong...");
    }
  }

}
