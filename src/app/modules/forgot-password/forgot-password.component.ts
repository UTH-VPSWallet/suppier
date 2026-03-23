import { Component } from "@angular/core";


@Component({
  selector: 'forgot-password',
  standalone: true,
  imports: [],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent {
  emailSent = false;

  onSubmit(e: Event) {
    e.preventDefault();
    this.emailSent = true;
  }
}
