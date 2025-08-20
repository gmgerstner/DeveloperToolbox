import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsQrInputComponent } from './sms-qr-input.component';

describe('SmsQrInputComponent', () => {
  let component: SmsQrInputComponent;
  let fixture: ComponentFixture<SmsQrInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsQrInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsQrInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
