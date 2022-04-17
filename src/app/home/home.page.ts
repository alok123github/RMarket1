import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  gotoProducts(){
    this.router.navigateByUrl('/products')
    console.log('products page')
  }

  addProduct(){
    this.router.navigateByUrl('/add-product')
  }

}
