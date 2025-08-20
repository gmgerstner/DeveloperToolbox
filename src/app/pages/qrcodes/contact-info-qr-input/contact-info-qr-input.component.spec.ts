import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInfoQrInputComponent } from './contact-info-qr-input.component';

describe('ContactInfoQrInputComponent', () => {
  let component: ContactInfoQrInputComponent;
  let fixture: ComponentFixture<ContactInfoQrInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactInfoQrInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInfoQrInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
