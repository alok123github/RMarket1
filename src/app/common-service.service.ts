import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  public categoryWiseGetProduct = new Subject<any>();
  public _getAllCat = new BehaviorSubject<any>('');
  public getAllCat = this._getAllCat.asObservable();

  public _getAllProd = new BehaviorSubject<any>('');
  public getAllProd = this._getAllProd.asObservable();

  public _setProdDetails = new BehaviorSubject<any>('');
  public getProdDetails = this._setProdDetails.asObservable();

  constructor() { }
  getCatWiseProduct() {
    return this.categoryWiseGetProduct;
  }

  postCatWiseProduct(product) {
    this.categoryWiseGetProduct.next(product);
  }

  getAllCategory(cat){
    this._getAllCat.next(cat);
  }

  getAllProducts(prod){
    this._getAllProd.next(prod);
  }

  setProductDetailsData(pd){
    this._setProdDetails.next(pd);
  }
}
