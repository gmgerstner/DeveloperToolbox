import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseQrInputComponent } from './base-qr-input.component';

describe('BaseQrInputComponent', () => {
  let component: BaseQrInputComponent;
  let fixture: ComponentFixture<BaseQrInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseQrInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseQrInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
