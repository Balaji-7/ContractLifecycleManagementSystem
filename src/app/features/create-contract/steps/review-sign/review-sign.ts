import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
/* Angular Material */
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-review-sign',
  imports: [CommonModule, MatCardModule,
    MatButtonModule],
  templateUrl: './review-sign.html',
  styleUrl: './review-sign.css',
})
export class ReviewSign {
  @Input() form!: FormGroup;

  get basicInfo() {
    return this.form.get('basicInfo')?.value;
  }

  get commercialInfo() {
    return this.form.get('commercialInfo')?.value;
  }
}
