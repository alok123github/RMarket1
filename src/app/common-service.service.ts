import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  public categoryWiseGetProduct = new Subject<any>();;

  constructor() { }
  getCatWiseProduct() {
    return this.categoryWiseGetProduct;
  }

  postCatWiseProduct(product) {
    this.categoryWiseGetProduct.next(product);
  }
}
