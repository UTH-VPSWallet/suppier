import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { LoginReq } from "../../models/auth.model";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  showPassword = false;
  loginForm = new FormGroup({
    Email: new FormControl(''),
    Pass: new FormControl(''),
  });

   constructor(
    private authService: AuthService,
  ) {}

  async onSubmit(e: Event) {
    e.preventDefault();
    // Navigate to dashboard (demo)
    //window.location.href = '/dashboard';
    const loginReq: LoginReq = {
      Email: this.loginForm.value.Email ?? '',
      Pass: this.loginForm.value.Pass ?? ''
    }
    const res = await this.authService.login(loginReq);
  }
}
