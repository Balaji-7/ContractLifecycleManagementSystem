import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule,FormGroup,AbstractControl, ValidationErrors } from '@angular/forms';
import { BasicInfo } from './steps/basic-info/basic-info';
import { CommercialInfo } from './steps/commercial-info/commercial-info';
import { ReviewSign } from './steps/review-sign/review-sign';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-contract',
  standalone: true, 
  imports: [CommonModule,
    ReactiveFormsModule,
    BasicInfo,
    FormsModule,
    CommercialInfo,
    ReviewSign,MatSnackBarModule],
  templateUrl: './create-contract.html',
  styleUrl: './create-contract.css',
})
export class CreateContract {
  currentStep = 1;
  private fb: FormBuilder = new FormBuilder();
  contractForm = this.fb.group({
    basicInfo: this.fb.group({
      title: ['', Validators.required],
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      contractType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    }, { validators: this.dateValidator }),
    commercialInfo: this.fb.group({
      contractValue: ['', Validators.required],
      currency: ['INR', Validators.required],
      paymentTerms: ['', Validators.required],
      description: ['', Validators.required]
    })
  });


dateValidator(group: AbstractControl): ValidationErrors | null {
  const start = group.get('startDate')?.value;
  const end = group.get('endDate')?.value;

  if (!start || !end) return null;

  return new Date(end) >= new Date(start)
    ? null
    : { dateInvalid: true };
}

  constructor(private router: Router,private snackBar: MatSnackBar) {}

  get basicInfoGroup(): FormGroup {
  return this.contractForm.get('basicInfo') as FormGroup;
}

get commercialInfoGroup(): FormGroup {
  return this.contractForm.get('commercialInfo') as FormGroup;
}

  /* ---------- Navigation ---------- */

  nextStep() {
    if (this.currentStep === 1 && this.contractForm.get('basicInfo')?.invalid) {
      this.contractForm.get('basicInfo')?.markAllAsTouched();
      return;
    }

    if (this.currentStep === 2 && this.contractForm.get('commercialInfo')?.invalid) {
      this.contractForm.get('commercialInfo')?.markAllAsTouched();
      return;
    }

    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }

  /* ---------- Save Draft ---------- */

  // saveDraft() {
  //   console.log('Draft Saved:', this.contractForm.value);
  //   alert('Draft Saved Successfully!');
  //   this.router.navigate(['/']);
  // }
saveDraft() {
  const contract = {
    id: Date.now(), // simple unique id
    ...this.contractForm.value,
    status: 'Draft',
    createdAt: new Date()
  };

  const existing = JSON.parse(localStorage.getItem('contracts') || '[]');

  existing.push(contract);

  localStorage.setItem('contracts', JSON.stringify(existing));

  alert('Draft Saved Successfully!');
  this.router.navigate(['/']);
}


  /* ---------- Submit ---------- */

  // submitContract() {
  //   console.log('Submitting to DocuSign:', this.contractForm.value);
  //   alert('Contract Sent for Signature!');
  //   this.router.navigate(['/']);
  // }

submitContract() {
  const contract = {
    id: Date.now(),
    ...this.contractForm.value,
    status: 'Sent',
    createdAt: new Date()
  };

  const existing = JSON.parse(localStorage.getItem('contracts') || '[]');

  existing.push(contract);

  localStorage.setItem('contracts', JSON.stringify(existing));

  alert('Contract Sent for Signature!');
  this.router.navigate(['/']);
}

cancel() {
  const confirmExit = confirm(
    'Are you sure you want to cancel? Unsaved changes will be lost.'
  );

  if (confirmExit) {
    this.router.navigate(['/']);
  }
}

}
