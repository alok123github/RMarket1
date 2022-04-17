import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor(private http: HttpClient,
    private loadCtrl:LoadingController) { }
  product:any;
  loading:any;

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.showLoading();
    this.http.get('https://rbazarapi.herokuapp.com/product').subscribe(data => {
      this.product=data;
      this.product=this.product.productData;
      console.log(this.product);
      this.loading.dismiss();
    })
  }

  deleteProduct(id:any){
    this.showLoading();
    let deleteUrl="https://rbazarapi.herokuapp.com/product/"+id;
    console.log(deleteUrl);
    this.http.delete(deleteUrl).subscribe((ok)=>{
      this.loading.dismiss();
      alert("Deleted Successfully!");
      this.getProducts();
    })
    
  }

  async showLoading(){
    this.loading=await this.loadCtrl.create({
      message:"Please wait..."
    })
    this.loading.present();
  }

}
