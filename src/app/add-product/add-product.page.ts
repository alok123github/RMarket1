import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private loadCtrl: LoadingController) { }

  loading: any;
  url: any;
  publicId: any;
  tempData: any;
  categoryRadio = "existing";
  tempDataCategory: any;

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

  cat = {
    catrgory: "",
    imagePath: "",
    cloudinary_id: "",
    photos: ""
  }

  catFilled = this.fb.group({
    category: [this.cat.catrgory],
    imagePath1: [""],
    cloudinary_id1: [""]
  })

  productFilled = this.fb.group({
    productName: [this.product.name],
    category: [this.product.category],
    desc: [this.product.description],
    price: [this.product.price],
    seller: [this.product.seller],
    imagePath: [''],
    cloudinary_id: ['']
  })

  ngOnInit() {
  }

  addProduct() {

    this.postProduct();

  }

  postProduct() {
    this.showLoading();
    var formData = new FormData();

    let apiUrl = "https://api.cloudinary.com/v1_1/dzduthsw5/upload";
    let preset = "kmskfcaj";

    if (this.categoryRadio === 'new') {
      var formDataCategory = new FormData();
      formDataCategory.append('file', this.cat.photos);
      formDataCategory.append('upload_preset', preset);

      this.http.post(apiUrl, formDataCategory).subscribe(data => {
        this.tempDataCategory = data;
        this.catFilled.patchValue({
          imagePath1: this.tempDataCategory.url,
          cloudinary_id1: this.tempDataCategory.public_id
        })

        this.http.post('https://rbazarapi.herokuapp.com/category/', this.catFilled.value).subscribe(res => {
          console.log(res);
          //start
          formData.append('file', this.product.photos);
          formData.append('upload_preset', preset);
          this.http.post(apiUrl, formData).subscribe(data => {
            this.tempData = data;

            this.productFilled.patchValue({
              imagePath: this.tempData.url,
              cloudinary_id: this.tempData.public_id
            })

            this.http.post('https://rbazarapi.herokuapp.com/product/', this.productFilled.value).subscribe(res => {
              console.log(res);
              this.loading.dismiss();
            }), error => {
              this.loading.dismiss();
              alert("Something went wrong...");
            }
          }), err => {
            console.log("Error" + err);
            this.loading.dismiss();
            alert("Something went wrong...");
          }
          //end
        }), error => {
          this.loading.dismiss();
          alert("Something went wrong...");
        }
      })
    }



    formData.append('file', this.product.photos);
    formData.append('upload_preset', preset);
    this.http.post(apiUrl, formData).subscribe(data => {
      this.tempData = data;

      this.productFilled.patchValue({
        imagePath: this.tempData.url,
        cloudinary_id: this.tempData.public_id
      })

      this.http.post('https://rbazarapi.herokuapp.com/product/', this.productFilled.value).subscribe(res => {
        console.log(res);
        this.loading.dismiss();
      }), error => {
        this.loading.dismiss();
        alert("Something went wrong...");
      }
    }), err => {
      console.log("Error" + err);
      this.loading.dismiss();
      alert("Something went wrong...");
    }

  }

  async showLoading() {
    this.loading = await this.loadCtrl.create({
      message: "Please wait...."
    })
    this.loading.present();
  }

  onFileSelected(event: any) {
    this.product.photos = event.target.files[0];

  }

  onCatFileSelected(event: any) {
    this.cat.photos = event.target.files[0];
  }

  changeRadio(event) {
    this.categoryRadio = event.detail.value;
    console.log(event.detail.value);
  }

}
