import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LOCALSTORAGE } from '../../constants/text.constant';
import { LoginStorage } from '../../models/auth.model';
import { SupplierService } from '../../services/supplier.service';
import { httpCodes } from '../../constants/enum.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  auth: LoginStorage = { Email: '', Name: '', Token: '', Address: '', Dob: '' };
  
  infoForm = new FormGroup({
    Address: new FormControl(''),
    Dob: new FormControl('')
  });

  passwordForm = new FormGroup({
    currentPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  successMessage = '';
  errorMessage = '';

  infoSuccessMessage = '';
  infoErrorMessage = '';

  loading = false;

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    try {
      const local = localStorage.getItem(LOCALSTORAGE.AUTH);
      if (local) {
        this.auth = JSON.parse(local);
        this.infoForm.patchValue({
          Address: this.auth.Address || '',
          Dob: this.auth.Dob || ''
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  get isMissingInfo(): boolean {
    return !this.auth.Address || !this.auth.Dob;
  }

  onUpdateInfo() {
    this.infoSuccessMessage = '';
    this.infoErrorMessage = '';
    const { Address, Dob } = this.infoForm.value;

    if (!Address || !Dob) {
      this.infoErrorMessage = 'Vui lòng nhập đầy đủ Địa chỉ và Ngày sinh!';
      return;
    }

    // Cập nhật local storage
    this.auth.Address = Address;
    this.auth.Dob = Dob;
    localStorage.setItem(LOCALSTORAGE.AUTH, JSON.stringify(this.auth));

    // Reload trang hoặc trigger event để topbar cập nhật (đơn giản nhất là tự báo success)
    this.infoSuccessMessage = 'Cập nhật thông tin thành công!';
    // Bắt buộc reload để topbar mất warning
    setTimeout(() => {
      window.location.reload();
    }, 800);
  }

  getShortName(name: string): string {
    if (!name) return '?';
    return name.split(' ').filter(w => w).map(w => w[0].toUpperCase()).join('');
  }

  async onChangePassword() {
    this.successMessage = '';
    this.errorMessage = '';

    const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

    if (!currentPassword || !newPassword || !confirmPassword) {
      this.errorMessage = 'Vui lòng nhập đầy đủ thông tin!';
      return;
    }

    if (newPassword !== confirmPassword) {
      this.errorMessage = 'Mật khẩu mới không khớp!';
      return;
    }

    const req = {
      Email: this.auth.Email,
      Pass: currentPassword,
      PassNew: newPassword
    };
    this.loading = true;
    const changePass = await this.supplierService.ChangePass(req);
    this.loading = false;
    if(changePass.Status === httpCodes.OK) this.router.navigate(['/login']);
    else{
      this.errorMessage = changePass.Message || 'Đổi mật khẩu thất bại!';
      this.cdr.detectChanges();
    }
  }
}
