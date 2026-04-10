import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  mainItems: NavItem[] = [
    { label: 'Dashboard', icon: '📊', route: '/dashboard' },
  ];

  manageItems: NavItem[] = [
    { label: 'Đơn Hàng', icon: '📋', route: '/orders', badge: 5 },
    { label: 'VPS / Sản Phẩm', icon: '🖥️', route: '/vps' },
    { label: 'Khách Hàng', icon: '👥', route: '/customers' },
    { label: 'Nhà Cung Cấp', icon: '🏢', route: '/providers' },
    { label: 'Thư Mục', icon: '📁', route: '/folders' },
  ];

}
