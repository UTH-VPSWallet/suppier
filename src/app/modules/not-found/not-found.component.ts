import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { LOCALSTORAGE } from "../../constants/text.constant";
import { LoginStorage } from "../../models/auth.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'not-found',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  isLoggedIn = false;
  showProfileMenu = false;
  auth: LoginStorage = { Email: '', Name: '', Token: '' };

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadAuth();
  }

  loadAuth() {
    try {
      const local = localStorage.getItem(LOCALSTORAGE.AUTH);
      if (local) {
        this.auth = JSON.parse(local);
        const token = this.auth.Token;
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          this.isLoggedIn = Date.now() < payload.exp * 1000;
        }
      }
    } catch (e) {
      this.isLoggedIn = false;
    }
  }

  getShortName(name: string): string {
    if (!name) return '?';
    return name.split(' ').filter(w => w).map(w => w[0].toUpperCase()).join('');
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout() {
    localStorage.removeItem(LOCALSTORAGE.AUTH);
    this.showProfileMenu = false;
    this.router.navigate(['/login']);
  }
}
