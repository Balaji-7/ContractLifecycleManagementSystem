import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  agreements: any[] = [];

  currentPage = 1;
  pageSize = 5;

  private _searchTerm = '';
  private _selectedStatus = 'All';

  /* ---------------- INIT ---------------- */

  ngOnInit() {
    this.loadContracts();
  }

  loadContracts() {
    this.agreements = JSON.parse(localStorage.getItem('contracts') || '[]');
  }

  /* ---------------- FILTER ---------------- */

  get searchTerm() {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.currentPage = 1;
  }

  get selectedStatus() {
    return this._selectedStatus;
  }

  set selectedStatus(value: string) {
    this._selectedStatus = value;
    this.currentPage = 1;
  }

  get filteredAgreements() {
    return this.agreements.filter(a =>
      (this.selectedStatus === 'All' || a.status === this.selectedStatus) &&
      (
        (a.basicInfo?.title || '').toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (a.basicInfo?.clientName || '').toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  /* ---------------- PAGINATION ---------------- */

  get totalPages(): number {
    return Math.ceil(this.filteredAgreements.length / this.pageSize);
  }

  get paginatedAgreements() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredAgreements.slice(start, start + this.pageSize);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  /* ---------------- ACTIONS ---------------- */

  viewAgreement(id: string) {
    alert('Viewing Agreement: ' + id);
  }

  editAgreement(agreement: any) {
    if (agreement.status === 'Draft') {
      alert('Editing Draft: ' + agreement.id);
    }
  }

  deleteAgreement(agreement: any) {
    if (agreement.status === 'Draft') {
      const confirmDelete = confirm('Are you sure you want to delete this draft?');
      if (confirmDelete) {
        this.agreements = this.agreements.filter(a => a.id !== agreement.id);
        localStorage.setItem('contracts', JSON.stringify(this.agreements));
      }
    }
  }

  /* ---------------- KPI ---------------- */

  get total() {
    return this.agreements.length;
  }

  get draft() {
    return this.agreements.filter(a => a.status === 'Draft').length;
  }

  get sent() {
    return this.agreements.filter(a => a.status === 'Sent').length;
  }

  get signed() {
    return this.agreements.filter(a => a.status === 'Signed').length;
  }

}
