import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
/* Angular Material Modules */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-commercial-info',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule,
    MatSelectModule],
  templateUrl: './commercial-info.html',
  styleUrl: './commercial-info.css',
})
export class CommercialInfo {
@Input() group!: FormGroup;

 currencies = ['INR', 'USD', 'EUR'];

  paymentTermsOptions = [
    'Net 15',
    'Net 30',
    'Net 45',
    'Net 60'
  ];
}
