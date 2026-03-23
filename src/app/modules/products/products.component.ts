import { CurrencyPipe } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";


@Component({
  selector: 'products',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent {
  search = '';

  products: Product[] = [
    { id: 'v1', name: 'SSD Cloud VPS A', provider: 'Nhân Hòa', cpu: '3 Core Xeon', ram: '2GB', storage: '20GB SSD', price: 150000, active: true, sold: 82, location: 'HN' },
    { id: 'v2', name: 'SSD Cloud VPS B', provider: 'Nhân Hòa', cpu: '4 Core Xeon', ram: '4GB', storage: '40GB SSD', price: 280000, active: true, sold: 45, location: 'HN' },
    { id: 'v3', name: 'VPS Standard S1', provider: 'VNPT Cloud', cpu: '2 Core Xeon E5', ram: '1GB', storage: '15GB SSD', price: 89000, active: true, sold: 67, location: 'HN' },
    { id: 'v4', name: 'VPS Standard S2', provider: 'VNPT Cloud', cpu: '4 Core Xeon E5', ram: '2GB', storage: '30GB SSD', price: 165000, active: true, sold: 38, location: 'SG' },
    { id: 'v5', name: 'Viettel IDC VPS Pro', provider: 'Viettel IDC', cpu: '6 Core Scalable', ram: '8GB', storage: '80GB NVMe', price: 550000, active: true, sold: 18, location: 'HN' },
    { id: 'v6', name: 'FPT Cloud Basic', provider: 'FPT Telecom', cpu: '2 Core AMD EPYC', ram: '2GB', storage: '25GB SSD', price: 120000, active: false, sold: 12, location: 'SG' },
  ];

  get filtered() {
    return this.products.filter(p => !this.search || p.name.toLowerCase().includes(this.search.toLowerCase()) || p.provider.toLowerCase().includes(this.search.toLowerCase()));
  }
}
