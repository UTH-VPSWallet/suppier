import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Notification {
  id: number;
  icon: string;
  message: string;
  time: string;
  color: string;
  read: boolean;
}

@Component({
  selector: 'topbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  @Input() pageTitle = 'Dashboard';

  showNotif = false;
  showProfile = false;
  darkMode = false;

  notifications: Notification[] = [
    { id: 1, icon: '📋', message: 'Đơn hàng #ORD-048 vừa được tạo', time: '2 phút trước', color: '#3b82f6', read: false },
    { id: 2, icon: '👤', message: 'Khách hàng Nguyễn Văn A đã đăng ký', time: '15 phút trước', color: '#22c55e', read: false },
    { id: 3, icon: '💰', message: 'Thanh toán #PAY-022 thành công', time: '1 giờ trước', color: '#f59e0b', read: false },
    { id: 4, icon: '⚠️', message: 'VPS SSD-A01 sắp hết hạn (3 ngày)', time: '3 giờ trước', color: '#ef4444', read: true },
    { id: 5, icon: '🖥️', message: 'Gói VPS Pro đã được kích hoạt', time: 'Hôm qua', color: '#8b5cf6', read: true },
  ];

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  constructor(private router: Router) {}

  toggleNotif() {
    this.showNotif = !this.showNotif;
    this.showProfile = false;
  }

  toggleProfile() {
    this.showProfile = !this.showProfile;
    this.showNotif = false;
  }

  closeAll() {
    this.showNotif = false;
    this.showProfile = false;
  }

  readNotif(n: Notification) {
    n.read = true;
  }

  markAllRead() {
    this.notifications.forEach(n => n.read = true);
  }

  logout() {
    this.closeAll();
    this.router.navigate(['/login']);
  }
}
