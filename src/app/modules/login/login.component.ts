import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { LoginReq } from "../../models/auth.model";

@Component({
  selector: 'login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  showPassword = false;

   constructor(
    private authService: AuthService,
  ) {}

  async onSubmit(e: Event) {
    e.preventDefault();
    // Navigate to dashboard (demo)
    //window.location.href = '/dashboard';
    const req: LoginReq = {
      email: 'nhanhoa@gmail.com',
      pass: '1111'
    }
    const res = await this.authService.login(req);
    console.log("res", res);

  }
}
