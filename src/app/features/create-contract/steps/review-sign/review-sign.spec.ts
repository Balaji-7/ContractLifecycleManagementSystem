import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSign } from './review-sign';

describe('ReviewSign', () => {
  let component: ReviewSign;
  let fixture: ComponentFixture<ReviewSign>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewSign]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewSign);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
