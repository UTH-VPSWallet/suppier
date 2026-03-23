import { CurrencyPipe } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";


@Component({
  selector: 'customers',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

export class CustomersComponent {
  search = '';
  statusFilter = '';

  customers: Customer[] = [
    { id: 'c1', name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', phone: '0901234567', totalOrders: 5, totalSpent: 850000, status: 'active', joinDate: '15/01/2025' },
    { id: 'c2', name: 'Trần Thị B', email: 'tranthib@company.vn', phone: '0912345678', totalOrders: 12, totalSpent: 4200000, status: 'active', joinDate: '10/12/2024' },
    { id: 'c3', name: 'Lê Văn C', email: 'levanc@startup.io', phone: '0923456789', totalOrders: 3, totalSpent: 1650000, status: 'active', joinDate: '05/02/2025' },
    { id: 'c4', name: 'Phạm Thị D', email: 'phamthid@gmail.com', phone: '0934567890', totalOrders: 8, totalSpent: 960000, status: 'active', joinDate: '20/11/2024' },
    { id: 'c5', name: 'Hoàng Văn E', email: 'hoangvane@gmail.com', phone: '0945678901', totalOrders: 1, totalSpent: 280000, status: 'inactive', joinDate: '01/03/2025' },
    { id: 'c6', name: 'Đỗ Thị F', email: 'dothif@tech.vn', phone: '0956789012', totalOrders: 20, totalSpent: 8900000, status: 'active', joinDate: '01/06/2024' },
  ];

  get filtered() {
    return this.customers.filter(c => {
      const matchSearch = !this.search || c.name.toLowerCase().includes(this.search.toLowerCase()) || c.email.includes(this.search) || c.phone.includes(this.search);
      const matchStatus = !this.statusFilter || c.status === this.statusFilter;
      return matchSearch && matchStatus;
    });
  }
}
