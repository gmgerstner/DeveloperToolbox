import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailQrInputComponent } from './email-qr-input.component';

describe('EmailQrInputComponent', () => {
  let component: EmailQrInputComponent;
  let fixture: ComponentFixture<EmailQrInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailQrInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailQrInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
