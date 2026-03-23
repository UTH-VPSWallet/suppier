import { Component } from "@angular/core";


@Component({
  selector: 'register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  showPassword = false;

  onSubmit(e: Event) {
    e.preventDefault();
    window.location.href = '/login';
  }
}
