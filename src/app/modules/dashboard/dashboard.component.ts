import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from "@angular/core";
import { LOCALSTORAGE } from "../../constants/text.constant";
import { LoginStorage } from "../../models/auth.model";

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  auth: LoginStorage = { Email: '', Name: '', Token: '' };

  currentDate = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    try {
      const local = localStorage.getItem(LOCALSTORAGE.AUTH);
      if (local) this.auth = JSON.parse(local);
    } catch (e) {
      console.error(e);
    }
  }

  stats: StatCard[] = [
    { label: 'Tổng Doanh Thu', value: '₫48.5M', trend: '12.5% so tháng trước', trendUp: true, icon: '💰', iconBg: '#dcfce7' },
    { label: 'Đơn Hàng', value: '1,284', trend: '8.1% so tháng trước', trendUp: true, icon: '📦', iconBg: '#dbeafe' },
    { label: 'Khách Hàng', value: '3,642', trend: '5.3% so tháng trước', trendUp: true, icon: '👥', iconBg: '#fef3c7' },
    { label: 'VPS Đang Hoạt Động', value: '2,891', trend: '2.1% so tháng trước', trendUp: false, icon: '🖥️', iconBg: '#ede9fe' },
  ];

  revenueData = [
    { day: 'T2', value: '₫5.2M', percent: 54 },
    { day: 'T3', value: '₫7.1M', percent: 74 },
    { day: 'T4', value: '₫6.3M', percent: 65 },
    { day: 'T5', value: '₫8.9M', percent: 92 },
    { day: 'T6', value: '₫4.8M', percent: 50 },
    { day: 'T7', value: '₫9.6M', percent: 100 },
    { day: 'CN', value: '₫6.6M', percent: 68, isToday: true },
  ];

  recentOrders: RecentOrder[] = [
    { id: '#ORD-001', customer: 'Nguyễn Văn A', product: 'SSD Cloud VPS A', amount: 150000, status: 'active', date: '2025-03-18' },
    { id: '#ORD-002', customer: 'Trần Thị B', product: 'VPS Standard S2', amount: 330000, status: 'paid', date: '2025-03-17' },
    { id: '#ORD-003', customer: 'Lê Văn C', product: 'Viettel IDC VPS Pro', amount: 1650000, status: 'pending', date: '2025-03-17' },
    { id: '#ORD-004', customer: 'Phạm Thị D', product: 'FPT Cloud Basic', amount: 120000, status: 'active', date: '2025-03-16' },
    { id: '#ORD-005', customer: 'Hoàng Văn E', product: 'SSD Cloud VPS B', amount: 840000, status: 'cancelled', date: '2025-03-15' },
    { id: '#ORD-006', customer: 'Vũ Thị F', product: 'VinaHost Pro', amount: 560000, status: 'paid', date: '2025-03-15' },
  ];

  activities: Activity[] = [
    { icon: '🆕', text: 'Đơn hàng #ORD-007 vừa được tạo bởi khách hàng mới', time: '5 phút trước', color: '#22c55e' },
    { icon: '💳', text: 'Thanh toán ₫330,000 từ Trần Thị B đã xác nhận', time: '15 phút trước', color: '#3b82f6' },
    { icon: '🖥️', text: 'VPS "SSD Cloud A" #VS-1824 đã được kích hoạt', time: '1 giờ trước', color: '#8b5cf6' },
    { icon: '⚠️', text: 'VPS #VS-1019 sắp hết hạn (còn 3 ngày)', time: '2 giờ trước', color: '#f59e0b' },
    { icon: '👤', text: 'Khách hàng mới Nguyễn Văn G đã đăng ký', time: '3 giờ trước', color: '#06b6d4' },
  ];

  topProducts = [
    { name: 'SSD Cloud VPS A', provider: 'Nhân Hòa', revenue: '₫12.3M', orders: 82 },
    { name: 'Viettel Pro VPS', provider: 'Viettel IDC', revenue: '₫9.8M', orders: 18 },
    { name: 'SSD Cloud VPS B', provider: 'Nhân Hòa', revenue: '₫7.2M', orders: 26 },
    { name: 'FPT Cloud Basic', provider: 'FPT', revenue: '₫5.4M', orders: 45 },
  ];

  locations = [
    { name: 'Hà Nội', percent: 55 },
    { name: 'TP. Hồ Chí Minh', percent: 32 },
    { name: 'Đà Nẵng', percent: 13 },
  ];

  statusLabel(status: string): string {
    const map: Record<string, string> = {
      active: '✅ Hoạt động',
      pending: '⏳ Chờ xử lý',
      paid: '💳 Đã thanh toán',
      expired: '⌛ Hết hạn',
      cancelled: '❌ Đã hủy',
    };
    return map[status] ?? status;
  }
}
