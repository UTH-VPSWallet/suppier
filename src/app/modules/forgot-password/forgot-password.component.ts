import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";


@Component({
  selector: 'forgot-password',
  standalone: true,
  imports: [RouterModule],
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
