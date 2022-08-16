import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'mail' },
    { title: 'All Products', url: '/products', icon: 'paper-plane' },
    { title: 'Add Products', url: '/add-product', icon: 'add-circle' },
    { title: 'Orders', url: '/orders', icon: 'receipt' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
