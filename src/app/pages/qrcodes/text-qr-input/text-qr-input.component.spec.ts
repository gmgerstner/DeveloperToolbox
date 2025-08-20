import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextQrInputComponent } from './text-qr-input.component';

describe('TextQrInputComponent', () => {
  let component: TextQrInputComponent;
  let fixture: ComponentFixture<TextQrInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextQrInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextQrInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
