import { Component } from "@angular/core";


@Component({
  selector: 'login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  showPassword = false;

  onSubmit(e: Event) {
    e.preventDefault();
    // Navigate to dashboard (demo)
    window.location.href = '/dashboard';
  }
}
