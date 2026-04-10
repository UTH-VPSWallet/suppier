import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LOCALSTORAGE } from "../../constants/text.constant";
import { LoginStorage } from "../../models/auth.model";

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  auth: LoginStorage = { Email: '', Name: '', Token: '' };

  mainItems: NavItem[] = [
    { label: 'Dashboard', icon: '📊', route: '/dashboard' },
  ];

  manageItems: NavItem[] = [
    { label: 'VPS', icon: '🖥️', route: '/vps' },
    { label: 'Đơn Hàng', icon: '📋', route: '/orders', badge: 5 }
  ];

  ngOnInit(){
    this.bindData();
  }

  bindData(){
    const local = localStorage.getItem(LOCALSTORAGE.AUTH);
    if(local) this.auth = JSON.parse(local);
  }

  getShortName(name: string): string {
    if (!name) return '';
    return name.split(' ').filter(word => word).map(word => word[0].toUpperCase()).join('');
  }

}
