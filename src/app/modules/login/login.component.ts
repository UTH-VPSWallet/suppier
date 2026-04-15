import { ChangeDetectorRef, Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { LoginReq } from "../../models/auth.model";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpStatusCode } from "@angular/common/http";
import { Router, RouterModule } from "@angular/router";
import { LOCALSTORAGE } from "../../constants/text.constant";

@Component({
  selector: 'login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  showPassword = false;
  loginForm = new FormGroup({
    Email: new FormControl(''),
    Pass: new FormControl(''),
  });
  loginErr = '';

   constructor(
    private authService: AuthService,
     private router: Router,
     private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(){
    localStorage.clear();
  }

  async onSubmit() {
    this.loginErr = '';
    const loginReq: LoginReq = {
      Email: this.loginForm.value.Email ?? '',
      Pass: this.loginForm.value.Pass ?? ''
    }
    const res: any = await this.authService.login(loginReq);
    if(res.Status != HttpStatusCode.Ok){
      this.loginErr = res.Message;
      this.cdr.detectChanges();
    }
    else{
      res.Data.Email = loginReq.Email;
      localStorage.setItem(LOCALSTORAGE.AUTH, JSON.stringify(res.Data));
      this.router.navigate(['/dashboard']);
    }
  }
}
