import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface FolderNode {
  id: string;
  name: string;
  parentId: string | null;
  color: string;
  createdAt: string;
  filesCount: number;
  size: string;
  pinned?: boolean;
}

@Component({
  selector: 'app-folders',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="folder-page">

      <!-- Header -->
      <div class="folder-page__header">
        <div>
          <h1 class="folder-page__title">📁 Thư Mục</h1>
          <p class="folder-page__sub">Quản lý thư mục & tài liệu VPS CRM</p>
        </div>
        <div class="folder-header-actions">
          <button class="folder-view-btn" [class.active]="viewMode==='grid'" (click)="viewMode='grid'" title="Dạng lưới">⊞</button>
          <button class="folder-view-btn" [class.active]="viewMode==='list'" (click)="viewMode='list'" title="Dạng danh sách">☰</button>
          <button class="folder-btn-new" (click)="openCreateModal()">
            <span>＋</span> Tạo Thư Mục
          </button>
        </div>
      </div>

      <!-- Breadcrumb -->
      <div class="folder-breadcrumb">
        <button class="folder-bc-item" (click)="navigateTo(null)">🏠 Tất cả</button>
        @for (crumb of breadcrumbs; track crumb.id) {
          <span class="folder-bc-sep">›</span>
          <button class="folder-bc-item" (click)="navigateTo(crumb.id)">{{ crumb.name }}</button>
        }
      </div>

      <!-- Search & filters -->
      <div class="folder-toolbar">
        <div class="folder-search-wrap">
          <span class="folder-search-icon">🔍</span>
          <input
            [(ngModel)]="searchText"
            type="text"
            placeholder="Tìm kiếm thư mục..."
            class="folder-search-input"
          />
        </div>
        <div class="folder-sort-wrap">
          <select [(ngModel)]="sortBy" class="folder-sort-select">
            <option value="name">Tên A–Z</option>
            <option value="nameDesc">Tên Z–A</option>
            <option value="date">Mới nhất</option>
            <option value="size">Kích thước</option>
          </select>
        </div>
      </div>

      <!-- Pinned section -->
      @if (pinnedFolders.length > 0 && !currentParentId) {
        <div class="folder-section-label">📌 Đã ghim</div>
        <div class="folder-grid" [class.folder-list]="viewMode === 'list'">
          @for (f of pinnedFolders; track f.id) {
            <div
              class="folder-card pinned"
              [class.folder-card--list]="viewMode === 'list'"
              (dblclick)="openFolder(f)"
              [class.folder-card--selected]="selectedId === f.id"
              (click)="selectFolder(f)"
            >
              <div class="folder-card__icon" [style.background]="f.color + '22'" [style.color]="f.color">
                📁
              </div>
              <div class="folder-card__info">
                @if (renamingId === f.id) {
                  <input
                    class="folder-rename-input"
                    [(ngModel)]="renamingValue"
                    (blur)="confirmRename(f)"
                    (keyup.enter)="confirmRename(f)"
                    (keyup.escape)="cancelRename()"
                    autofocus
                    (click)="$event.stopPropagation()"
                  />
                } @else {
                  <span class="folder-card__name" (dblclick)="startRename(f, $event)">{{ f.name }}</span>
                }
                <span class="folder-card__meta">{{ f.filesCount }} mục · {{ f.size }}</span>
              </div>
              <div class="folder-card__actions" (click)="$event.stopPropagation()">
                <button class="folder-action-btn" title="Mở" (click)="openFolder(f)">↗</button>
                <button class="folder-action-btn" title="Đổi tên" (click)="startRename(f, $event)">✏️</button>
                <button class="folder-action-btn" title="Bỏ ghim" (click)="togglePin(f)">📌</button>
                <button class="folder-action-btn danger" title="Xóa" (click)="deleteFolder(f)">🗑️</button>
              </div>
            </div>
          }
        </div>
      }

      <!-- Main folders -->
      <div class="folder-section-label">
        @if (currentParentId) {
          📂 Bên trong: {{ currentParentName }}
        } @else {
          🗂️ Tất cả thư mục
        }
        <span class="folder-count-badge">{{ visibleFolders.length }}</span>
      </div>

      @if (visibleFolders.length === 0) {
        <div class="folder-empty">
          <div class="folder-empty__icon">📭</div>
          <div class="folder-empty__title">Không có thư mục nào</div>
          <div class="folder-empty__sub">Nhấn "Tạo Thư Mục" để bắt đầu</div>
        </div>
      } @else {
        <div class="folder-grid" [class.folder-list]="viewMode === 'list'">
          @for (f of visibleFolders; track f.id) {
            <div
              class="folder-card"
              [class.folder-card--list]="viewMode === 'list'"
              [class.folder-card--selected]="selectedId === f.id"
              (click)="selectFolder(f)"
              (dblclick)="openFolder(f)"
            >
              <div class="folder-card__icon" [style.background]="f.color + '22'" [style.color]="f.color">
                📁
              </div>
              <div class="folder-card__info">
                @if (renamingId === f.id) {
                  <input
                    class="folder-rename-input"
                    [(ngModel)]="renamingValue"
                    (blur)="confirmRename(f)"
                    (keyup.enter)="confirmRename(f)"
                    (keyup.escape)="cancelRename()"
                    autofocus
                    (click)="$event.stopPropagation()"
                  />
                } @else {
                  <span class="folder-card__name" (dblclick)="startRename(f, $event)">{{ f.name }}</span>
                }
                <span class="folder-card__meta">{{ f.filesCount }} mục · {{ f.size }} · {{ f.createdAt }}</span>
              </div>
              <div class="folder-card__actions" (click)="$event.stopPropagation()">
                <button class="folder-action-btn" title="Mở" (click)="openFolder(f)">↗</button>
                <button class="folder-action-btn" title="Đổi tên" (click)="startRename(f, $event)">✏️</button>
                <button class="folder-action-btn" title="{{ f.pinned ? 'Bỏ ghim' : 'Ghim' }}" (click)="togglePin(f)">{{ f.pinned ? '📌' : '📍' }}</button>
                <button class="folder-action-btn danger" title="Xóa" (click)="deleteFolder(f)">🗑️</button>
              </div>
            </div>
          }
        </div>
      }
    </div>

    <!-- Create Folder Modal -->
    @if (showCreateModal) {
      <div class="folder-modal-overlay" (click)="closeCreateModal()">
        <div class="folder-modal" (click)="$event.stopPropagation()">
          <div class="folder-modal__header">
            <h2 class="folder-modal__title">📁 Tạo Thư Mục Mới</h2>
            <button class="folder-modal__close" (click)="closeCreateModal()">✕</button>
          </div>
          <div class="folder-modal__body">
            <label class="folder-modal__label">Tên thư mục</label>
            <input
              class="folder-modal__input"
              [(ngModel)]="newFolderName"
              placeholder="VD: Khách hàng VIP, Hóa đơn tháng 4..."
              (keyup.enter)="createFolder()"
              autofocus
            />
            <label class="folder-modal__label" style="margin-top: 1rem;">Màu sắc</label>
            <div class="folder-color-picker">
              @for (c of colorOptions; track c) {
                <button
                  class="folder-color-dot"
                  [style.background]="c"
                  [class.selected]="newFolderColor === c"
                  (click)="newFolderColor = c"
                ></button>
              }
            </div>
          </div>
          <div class="folder-modal__footer">
            <button class="folder-btn-cancel" (click)="closeCreateModal()">Hủy</button>
            <button class="folder-btn-create" (click)="createFolder()" [disabled]="!newFolderName.trim()">
              ✓ Tạo Thư Mục
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class FoldersComponent {
  viewMode: 'grid' | 'list' = 'grid';
  searchText = '';
  sortBy = 'name';
  selectedId: string | null = null;
  currentParentId: string | null = null;
  renamingId: string | null = null;
  renamingValue = '';
  showCreateModal = false;
  newFolderName = '';
  newFolderColor = '#22c55e';

  colorOptions = [
    '#22c55e', '#3b82f6', '#f59e0b', '#ef4444',
    '#8b5cf6', '#ec4899', '#06b6d4', '#f97316',
    '#10b981', '#6366f1',
  ];

  folders: FolderNode[] = [
    { id: 'f1', name: 'VPS CRM', parentId: null, color: '#22c55e', createdAt: '01/04/2026', filesCount: 3, size: '2.4 MB', pinned: true },
    { id: 'f2', name: 'Khách Hàng', parentId: null, color: '#3b82f6', createdAt: '01/04/2026', filesCount: 12, size: '8.1 MB', pinned: false },
    { id: 'f3', name: 'Đơn Hàng', parentId: null, color: '#f59e0b', createdAt: '02/04/2026', filesCount: 47, size: '15.3 MB', pinned: false },
    { id: 'f4', name: 'Hóa Đơn', parentId: null, color: '#ef4444', createdAt: '02/04/2026', filesCount: 23, size: '5.7 MB', pinned: false },
    { id: 'f5', name: 'Sản Phẩm', parentId: null, color: '#8b5cf6', createdAt: '03/04/2026', filesCount: 8, size: '12.0 MB', pinned: false },
    { id: 'f6', name: 'Nhà Cung Cấp', parentId: null, color: '#ec4899', createdAt: '03/04/2026', filesCount: 6, size: '3.2 MB', pinned: false },
    { id: 'f7', name: 'Báo Cáo Tháng 3', parentId: 'f1', color: '#06b6d4', createdAt: '01/04/2026', filesCount: 4, size: '1.2 MB', pinned: false },
    { id: 'f8', name: 'Backup', parentId: 'f1', color: '#6366f1', createdAt: '01/04/2026', filesCount: 2, size: '980 KB', pinned: false },
    { id: 'f9', name: 'Tài Liệu Kỹ Thuật', parentId: 'f1', color: '#10b981', createdAt: '02/04/2026', filesCount: 9, size: '4.1 MB', pinned: false },
  ];

  get breadcrumbs(): FolderNode[] {
    const result: FolderNode[] = [];
    let pid = this.currentParentId;
    while (pid) {
      const node = this.folders.find(f => f.id === pid);
      if (!node) break;
      result.unshift(node);
      pid = node.parentId;
    }
    return result;
  }

  get currentParentName(): string {
    return this.folders.find(f => f.id === this.currentParentId)?.name ?? '';
  }

  get pinnedFolders(): FolderNode[] {
    return this.folders.filter(f => f.pinned && f.parentId === null);
  }

  get visibleFolders(): FolderNode[] {
    let list = this.folders.filter(f => f.parentId === this.currentParentId && !f.pinned);
    if (this.searchText.trim()) {
      list = list.filter(f => f.name.toLowerCase().includes(this.searchText.toLowerCase()));
    }
    return this.sortFolders(list);
  }

  sortFolders(list: FolderNode[]): FolderNode[] {
    return [...list].sort((a, b) => {
      if (this.sortBy === 'name') return a.name.localeCompare(b.name);
      if (this.sortBy === 'nameDesc') return b.name.localeCompare(a.name);
      if (this.sortBy === 'date') return b.createdAt.localeCompare(a.createdAt);
      return 0;
    });
  }

  selectFolder(f: FolderNode) {
    this.selectedId = f.id;
  }

  openFolder(f: FolderNode) {
    this.currentParentId = f.id;
    this.selectedId = null;
    this.searchText = '';
  }

  navigateTo(id: string | null) {
    this.currentParentId = id;
    this.selectedId = null;
    this.searchText = '';
  }

  startRename(f: FolderNode, e: Event) {
    e.stopPropagation();
    this.renamingId = f.id;
    this.renamingValue = f.name;
  }

  confirmRename(f: FolderNode) {
    if (this.renamingValue.trim()) {
      f.name = this.renamingValue.trim();
    }
    this.renamingId = null;
  }

  cancelRename() {
    this.renamingId = null;
  }

  togglePin(f: FolderNode) {
    f.pinned = !f.pinned;
  }

  deleteFolder(f: FolderNode) {
    if (confirm(`Xóa thư mục "${f.name}"?`)) {
      this.folders = this.folders.filter(x => x.id !== f.id && x.parentId !== f.id);
    }
  }

  openCreateModal() {
    this.newFolderName = '';
    this.newFolderColor = '#22c55e';
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  createFolder() {
    if (!this.newFolderName.trim()) return;
    const newFolder: FolderNode = {
      id: 'f' + Date.now(),
      name: this.newFolderName.trim(),
      parentId: this.currentParentId,
      color: this.newFolderColor,
      createdAt: new Date().toLocaleDateString('vi-VN'),
      filesCount: 0,
      size: '0 KB',
      pinned: false,
    };
    this.folders = [newFolder, ...this.folders];
    this.closeCreateModal();
  }
}

interface NavItem {
  label: string;
  icon: string;
  route: string;
  badge?: number;
}
