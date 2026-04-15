import { ChangeDetectorRef, Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SupplierService } from "../../services/supplier.service";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { httpCodes } from "../../constants/enum.constant";


@Component({
  selector: 'forgot-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent {
  
  forgotPassForm = new FormGroup({
    Email: new FormControl(''),
    Phone: new FormControl(''),
  });

  emailSent = false;
  newPassword = '';
  err: string = '';
  
  constructor(
    private supplierService: SupplierService,
    private cdr: ChangeDetectorRef
  ) {}

  async onSubmit(e: Event) {
    this.err = '';
    this.newPassword = '';
    const res = await this.supplierService.ForgotPass({
      Email: this.forgotPassForm.value.Email ?? '',
      Phone: this.forgotPassForm.value.Phone ?? ''
    });
    this.err = res.Message;
    if(res.Status != httpCodes.OK)this.err = res.Message;
    else{
      e.preventDefault();
      this.emailSent = true;
      this.newPassword = res.Data.NewPass;
    }
    this.cdr.detectChanges();
  }
}
