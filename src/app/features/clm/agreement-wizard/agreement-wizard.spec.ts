import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementWizard } from './agreement-wizard';

describe('AgreementWizard', () => {
  let component: AgreementWizard;
  let fixture: ComponentFixture<AgreementWizard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgreementWizard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgreementWizard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
