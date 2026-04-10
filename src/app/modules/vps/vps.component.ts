import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { VPSService } from "../../services/vps.service";
import { VPSGetAllReq } from "../../models/vps.model";
import { LOCALSTORAGE } from "../../constants/text.constant";
import { LoginStorage } from "../../models/auth.model";


@Component({
  selector: 'vw-vps',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './vps.component.html',
  styleUrls: ['./vps.component.scss']
})

export class VPSComponent  {
  search = '';
  showModal = false;
  showDeleteConfirm = false;
  isEditing = false;
  deleteTargetId = '';
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
  formData: Product = this.getEmptyProduct();

  products: Product[] = [
    { id: 'v1', name: 'SSD Cloud VPS A', provider: 'Nhân Hòa', cpu: '3 Core Xeon', ram: '2GB', storage: '20GB SSD', price: 150000, active: true, sold: 82, location: 'HN' },
    { id: 'v2', name: 'SSD Cloud VPS B', provider: 'Nhân Hòa', cpu: '4 Core Xeon', ram: '4GB', storage: '40GB SSD', price: 280000, active: true, sold: 45, location: 'HN' },
    { id: 'v3', name: 'VPS Standard S1', provider: 'VNPT Cloud', cpu: '2 Core Xeon E5', ram: '1GB', storage: '15GB SSD', price: 89000, active: true, sold: 67, location: 'HN' },
    { id: 'v4', name: 'VPS Standard S2', provider: 'VNPT Cloud', cpu: '4 Core Xeon E5', ram: '2GB', storage: '30GB SSD', price: 165000, active: true, sold: 38, location: 'SG' },
    { id: 'v5', name: 'Viettel IDC VPS Pro', provider: 'Viettel IDC', cpu: '6 Core Scalable', ram: '8GB', storage: '80GB NVMe', price: 550000, active: true, sold: 18, location: 'HN' },
    { id: 'v6', name: 'FPT Cloud Basic', provider: 'FPT Telecom', cpu: '2 Core AMD EPYC', ram: '2GB', storage: '25GB SSD', price: 120000, active: false, sold: 12, location: 'SG' },
  ];

  get filtered() {
    return this.products.filter(p => !this.search || p.name.toLowerCase().includes(this.search.toLowerCase()) || p.provider.toLowerCase().includes(this.search.toLowerCase()));
  }

  constructor(
    private vpsService: VPSService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.BindData();
  }
  
  async BindData(): Promise<void>{
    let auth: LoginStorage = { Email: '', Name: '', Token: '' };
    const local = localStorage.getItem(LOCALSTORAGE.AUTH);
    if(local) auth = JSON.parse(local);
    const vpsReq: VPSGetAllReq = { Email: auth.Email };
    const vps = await this.vpsService.GetAll(vpsReq);
    console.log("vps", vps)
  }

  getEmptyProduct(): Product {
    return {
      id: '',
      name: '',
      provider: '',
      cpu: '',
      ram: '',
      storage: '',
      price: 0,
      active: true,
      sold: 0,
      location: 'HN',
    };
  }

  // Open add modal
  openAddModal() {
    this.isEditing = false;
    this.formData = this.getEmptyProduct();
    this.formData.id = 'v' + (Date.now().toString(36));
    this.showModal = true;
  }

  // Open edit modal
  openEditModal(product: Product) {
    this.isEditing = true;
    this.formData = { ...product };
    this.showModal = true;
  }

  // Close modal
  closeModal() {
    this.showModal = false;
  }

  // Save (add or edit)
  saveProduct() {
    if (!this.formData.name.trim() || !this.formData.provider || !this.formData.cpu.trim()) {
      this.showToast('Vui lòng điền đầy đủ các trường bắt buộc!', 'error');
      return;
    }

    if (this.isEditing) {
      const idx = this.products.findIndex(p => p.id === this.formData.id);
      if (idx !== -1) {
        this.products[idx] = { ...this.formData };
        this.showToast(`Đã cập nhật gói VPS "${this.formData.name}" thành công!`, 'success');
      }
    } else {
      this.products.unshift({ ...this.formData });
      this.showToast(`Đã thêm gói VPS "${this.formData.name}" thành công!`, 'success');
    }
    this.closeModal();
  }

  // Open delete confirmation
  openDeleteConfirm(product: Product) {
    this.deleteTargetId = product.id;
    this.deleteTargetName = product.name;
    this.showDeleteConfirm = true;
  }

  // Close delete confirmation
  closeDeleteConfirm() {
    this.showDeleteConfirm = false;
    this.deleteTargetId = '';
    this.deleteTargetName = '';
  }

  // Confirm delete
  confirmDelete() {
    this.products = this.products.filter(p => p.id !== this.deleteTargetId);
    this.showToast(`Đã xóa gói VPS "${this.deleteTargetName}" thành công!`, 'success');
    this.closeDeleteConfirm();
  }

  // Toggle active
  toggleActive(product: Product) {
    product.active = !product.active;
    const status = product.active ? 'kích hoạt' : 'tạm dừng';
    this.showToast(`Đã ${status} gói VPS "${product.name}"`, 'info');
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
      this.formData.name.trim() &&
      this.formData.provider &&
      this.formData.cpu.trim() &&
      this.formData.ram.trim() &&
      this.formData.storage.trim() &&
      this.formData.price > 0
    );
  }
}
