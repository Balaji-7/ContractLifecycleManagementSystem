import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialInfo } from './commercial-info';

describe('CommercialInfo', () => {
  let component: CommercialInfo;
  let fixture: ComponentFixture<CommercialInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommercialInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
