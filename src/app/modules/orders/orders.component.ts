import { CurrencyPipe } from "@angular/common";
import { ChangeDetectorRef, Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { OrderService } from "../../services/order.service";
import { LoginStorage } from "../../models/auth.model";
import { LOCALSTORAGE } from "../../constants/text.constant";
import { ResData } from "../../models/res.model";
import { GetOrderBySupplierRes } from "../../models/order.model";
import { httpCodes } from "../../constants/enum.constant";

export interface Order {
  id: string;
  customer: string;
  email: string;
  product: string;
  provider: string;
  amount: number;
  months: number;
  status: string;
  date: string;
}

@Component({
  selector: 'orders',
  standalone: true,
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent {
  loading: boolean = false;
  search = '';
  statusFilter = '';
  headers = ['Mã ĐH', 'Khách hàng', 'Sản phẩm', 'Giá trị', 'Ngày tạo', 'Trạng thái', 'Thao tác'];
  btndisable: string = '';
  // Toast notification
  toast: { message: string; type: 'success' | 'error' | 'info' } | null = null;
  private toastTimer: any;

  // ─── Add dialog ───────────────────────────────────────────────
  showAddDialog = false;
  addForm: Omit<Order, 'id'> = this.emptyForm();

  orders: ResData<GetOrderBySupplierRes[]> = { Status: 0, Message: '', Data: [] };
  auth: LoginStorage = { Email: '', Name: '', Token: '', Address: '', Dob: '' }; 

  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) { }

  async ngOnInit() {
    await this.bindData();
    this.cdr.detectChanges();
  }

  async bindData(){
    try {
      const local = localStorage.getItem(LOCALSTORAGE.AUTH);
      if (local) this.auth = JSON.parse(local);
    } catch(e) { console.error(e)}
    this.orders = await this.orderService.GetAll({ Email: this.auth.Email });
    this.cdr.detectChanges();
  }

  openAddDialog() {
    this.addForm = this.emptyForm();
    this.showAddDialog = true;
  }

  confirmAdd() {
    // const nextNum = this.orders.Data.length + 1;
    // const id = `#ORD-${String(nextNum).padStart(3, '0')}`;
    // this.orders.Data = [...this.orders.Data, { ID, ...this.addForm }];
    // this.showAddDialog = false;
  }

  // ─── Edit dialog ──────────────────────────────────────────────
  showEditDialog = false;
  editForm: GetOrderBySupplierRes = { ID: 0, CustomerName: '', CustomerEmail: '', TotalPrice: 0, CreatedAt: 0, Status: 0, VPS: [] };

  openEditDialog(order: GetOrderBySupplierRes) {
    this.editForm = { ...order };
    this.showEditDialog = true;
  }

  async confirmEdit() {
    // this.orders = this.orders.Data.map(o => o.id === this.editForm.id ? { ...this.editForm } : o);
    this.loading = true;
    this.btndisable = 'vps-btn--disabled';
    const edit = await this.orderService.Edit({
      ID: this.editForm.ID,
      Status: this.editForm.Status
    });
    if(edit.Status == httpCodes.OK) {
      this.showToast(`Đã sửa trạng thái đơn hàng thành công!`, 'success');
      this.bindData();
    }
    this.btndisable = '';
    this.loading = false;
    this.closeModal();
    this.cdr.detectChanges();
  }

  // ─── Delete dialog ────────────────────────────────────────────
  showDeleteDialog = false;
  deleteTarget: Order | null = null;

  openDeleteDialog(order: GetOrderBySupplierRes) {
    // this.deleteTarget = order;
    // this.showDeleteDialog = true;
  }

  confirmDelete() {
    // if (this.deleteTarget) {
    //   this.orders = this.orders.filter(o => o.id !== this.deleteTarget!.id);
    // }
    // this.showDeleteDialog = false;
    // this.deleteTarget = null;
  }

  // ─── Shared ───────────────────────────────────────────────────
  get filtered() {
    return this.orders.Data.filter(o => {
      const matchSearch = !this.search || o.CustomerName.toLowerCase().includes(this.search.toLowerCase()) || o.ID.toString().includes(this.search);
      const matchStatus = !this.statusFilter || o.Status.toString() === this.statusFilter;
      return matchSearch && matchStatus;
    });
  }

  statusLabel(s: number) {
    const m: Record<number, string> = { 0: '✅ Hoạt động', 1: '⏳ Chờ xử lý', 2: '💳 Đã TT', 3: '⌛ Hết hạn', 4: '❌ Đã hủy' };
    return m[s] ?? s;
  }

  private emptyForm(): Omit<Order, 'id'> {
    const today = new Date();
    const d = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    return { customer: '', email: '', product: '', provider: '', amount: 0, months: 1, status: 'active', date: d };
  }

    // Toast helper
  showToast(message: string, type: 'success' | 'error' | 'info') {
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toast = { message, type };
    this.toastTimer = setTimeout(() => {
      this.toast = null;
    }, 3000);
  }
  closeModal(){
    this.showEditDialog = false;
  }
}
