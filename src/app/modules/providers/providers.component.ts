import { CurrencyPipe } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";


@Component({
  selector: 'providers',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})

export class ProvidersComponent {
   providers: Provider[] = [
    { id: 'p1', name: 'Nhân Hòa', location: 'Hà Nội', rating: 4.5, products: 12, activeVps: 890, revenue: 12300000, status: 'active' },
    { id: 'p2', name: 'VNPT Cloud', location: 'Hà Nội', rating: 4.3, products: 8, activeVps: 654, revenue: 9800000, status: 'active' },
    { id: 'p3', name: 'Viettel IDC', location: 'Hà Nội', rating: 4.4, products: 10, activeVps: 721, revenue: 11200000, status: 'active' },
    { id: 'p4', name: 'FPT Telecom', location: 'TP.HCM', rating: 4.2, products: 6, activeVps: 312, revenue: 5400000, status: 'active' },
    { id: 'p5', name: 'VinaHost', location: 'TP.HCM', rating: 4.1, products: 9, activeVps: 178, revenue: 3200000, status: 'active' },
    { id: 'p6', name: 'PA Vietnam', location: 'Đà Nẵng', rating: 4.0, products: 7, activeVps: 136, revenue: 2100000, status: 'inactive' },
  ];
}
