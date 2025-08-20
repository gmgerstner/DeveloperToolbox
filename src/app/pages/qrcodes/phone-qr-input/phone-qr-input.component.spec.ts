import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneQrInputComponent } from './phone-qr-input.component';

describe('PhoneQrInputComponent', () => {
  let component: PhoneQrInputComponent;
  let fixture: ComponentFixture<PhoneQrInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneQrInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneQrInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
