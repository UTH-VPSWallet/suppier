import { ChangeDetectorRef, Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { VPSService } from "../../services/vps.service";
import { VPSCreateReq, VPSGetAllReq, VPSGetAllRes, VPSUpdateReq } from "../../models/vps.model";
import { LOCALSTORAGE } from "../../constants/text.constant";
import { LoginStorage } from "../../models/auth.model";
import { httpCodes, VPSStatus } from "../../constants/enum.constant";


@Component({
  selector: 'vw-vps',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './vps.component.html',
  styleUrls: ['./vps.component.scss']
})

export class VPSComponent  {
  VPSStatus = VPSStatus;
  auth: LoginStorage = { Email: '', Name: '', Token: '' };
  search = '';
  showModal = false;
  showDeleteConfirm = false;
  isEditing = false;
  deleteTargetId = 0;
  deleteTargetName = '';

  // Toast notification
  toast: { message: string; type: 'success' | 'error' | 'info' } | null = null;
  private toastTimer: any;

  // Available providers and locations for the form
  providerOptions = ['Nhân Hòa', 'VNPT Cloud', 'Viettel IDC', 'FPT Telecom', 'VinaHost', 'PA Vietnam'];
  locationOptions = [
    { value: 'HN', label: 'Hà Nội' },
    { value: 'SG', label: 'TP.HCM' },
    { value: 'DN', label: 'Đà Nẵng' },
  ];

  // Form model
  formData: VPSCreateReq = this.getEmptyVPS();

  vpss: VPSGetAllRes[] = [];

  get filtered() {
    return this.vpss.filter(vps => !this.search || vps.Name.toLowerCase().includes(this.search.toLowerCase()));
  }

  constructor(
    private vpsService: VPSService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    await this.BindData();
  }
  
  async BindData(): Promise<void>{
    const local = localStorage.getItem(LOCALSTORAGE.AUTH);
    if(local) this.auth = JSON.parse(local);
    const vpsReq: VPSGetAllReq = { Email: this.auth.Email };
    const vps = await this.vpsService.GetAll(vpsReq);
    if(vps.Status == httpCodes.OK) this.vpss = vps.Data;
    this.cdr.detectChanges();
  }

  getEmptyVPS(): VPSCreateReq {
    return {
      ID: 0,
      Name: '',
      CPU: '',
      RAM: '',
      Storage: '',
      PricePerMonth: 0,
      Status: 0,
      Email: ''
    };
  }

  // Open add modal
  openAddModal() {
    this.isEditing = false;
    this.formData = this.getEmptyVPS();
    this.showModal = true;
  }

  // Open edit modal
  openEditModal(vps: VPSGetAllRes) {
    this.isEditing = true;
    this.formData = { 
      ...vps,
      Email: this.auth.Email
    };
    this.showModal = true;
  }

  // Close modal
  closeModal() {
    this.showModal = false;
  }

  // Save (add or edit)
  async save() {
    this.formData.Email = this.auth.Email;
    if(this.formData.Status) this.formData.Status = 1;
    else this.formData.Status = 0;
    if (!this.formData.Name.trim() || !this.formData.CPU.trim() || !this.formData.RAM.trim()
      || !this.formData.Storage.trim() || !this.formData.Email.trim() || !this.formData.PricePerMonth) {
      this.showToast('Vui lòng điền đầy đủ các trường bắt buộc!', 'error');
      return;
    }

    if (this.isEditing) {
      const edit = await this.vpsService.Edit(this.formData);
      if(edit.Status == httpCodes.OK){
        this.showToast(`Đã cập nhật gói VPS "${this.formData.Name}" thành công!`, 'success');
        this.closeModal();
        this.BindData();
      }
    } else {
      const save = await this.vpsService.Add(this.formData);
      if(save.Status == httpCodes.OK){
        this.showToast(`Đã thêm gói VPS "${this.formData.Name}" thành công!`, 'success');
        this.closeModal();
        this.BindData();
      } 
    }
    this.closeModal();
  }

  // Open delete confirmation
  openDeleteConfirm(vps: VPSGetAllRes) {
    this.deleteTargetId = vps.ID;
    this.deleteTargetName = vps.Name;
    this.showDeleteConfirm = true;
  }

  // Close delete confirmation
  closeDeleteConfirm() {
    this.showDeleteConfirm = false;
    this.deleteTargetId = 0;
    this.deleteTargetName = '';
  }

  // Confirm delete
  async confirmDelete() {
    this.vpss = this.vpss.filter(p => p.ID !== this.deleteTargetId);
    const del = await this.vpsService.Remove({ID: this.deleteTargetId})
    if(del.Status == httpCodes.OK){
      this.showToast(`Đã xóa gói VPS "${this.deleteTargetName}" thành công!`, 'success');
      this.closeDeleteConfirm();
      this.BindData();
    }
  }

  // Toast helper
  showToast(message: string, type: 'success' | 'error' | 'info') {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toast = { message, type };
    this.toastTimer = setTimeout(() => {
      this.toast = null;
    }, 3000);
  }

  // Form validation
  get isFormValid(): boolean {
    return !!(
      this.formData.Name.trim() &&
      this.formData.CPU.trim() &&
      this.formData.RAM.trim() &&
      this.formData.Storage.trim() &&
      this.formData.PricePerMonth > 0
    );
  }
}
