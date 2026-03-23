import { CurrencyPipe } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";


@Component({
  selector: 'orders',
  standalone: true,
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent {
  search = '';
  statusFilter = '';
  headers = ['Mã ĐH', 'Khách hàng', 'Sản phẩm', 'Giá trị', 'Kỳ hạn', 'Ngày tạo', 'Trạng thái', ''];

  orders: Order[] = [
    { id: '#ORD-001', customer: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', product: 'SSD Cloud VPS A', provider: 'Nhân Hòa', amount: 150000, months: 1, status: 'active', date: '18/03/2025' },
    { id: '#ORD-002', customer: 'Trần Thị B', email: 'tranthib@gmail.com', product: 'VPS Standard S2', provider: 'VNPT Cloud', amount: 495000, months: 3, status: 'paid', date: '17/03/2025' },
    { id: '#ORD-003', customer: 'Lê Văn C', email: 'levanc@company.vn', product: 'Viettel IDC VPS Pro', provider: 'Viettel IDC', amount: 3300000, months: 6, status: 'pending', date: '17/03/2025' },
    { id: '#ORD-004', customer: 'Phạm Thị D', email: 'phamthid@gmail.com', product: 'FPT Cloud Basic', provider: 'FPT Telecom', amount: 120000, months: 1, status: 'active', date: '16/03/2025' },
    { id: '#ORD-005', customer: 'Hoàng Văn E', email: 'hoangvane@gmail.com', product: 'SSD Cloud VPS B', provider: 'Nhân Hòa', amount: 840000, months: 3, status: 'cancelled', date: '15/03/2025' },
    { id: '#ORD-006', customer: 'Đỗ Thị F', email: 'dothif@startup.io', product: 'SSD Cloud VPS A', provider: 'Nhân Hòa', amount: 1800000, months: 12, status: 'active', date: '10/03/2025' },
    { id: '#ORD-007', customer: 'Vũ Văn G', email: 'vuvang@gmail.com', product: 'VPS Standard S1', provider: 'VNPT Cloud', amount: 89000, months: 1, status: 'expired', date: '01/03/2025' },
  ];

  get filtered() {
    return this.orders.filter(o => {
      const matchSearch = !this.search || o.customer.toLowerCase().includes(this.search.toLowerCase()) || o.id.includes(this.search);
      const matchStatus = !this.statusFilter || o.status === this.statusFilter;
      return matchSearch && matchStatus;
    });
  }

  statusLabel(s: string) {
    const m: Record<string, string> = { active: '✅ Hoạt động', pending: '⏳ Chờ xử lý', paid: '💳 Đã TT', expired: '⌛ Hết hạn', cancelled: '❌ Đã hủy' };
    return m[s] ?? s;
  }
}
