import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlQrInputComponent } from './url-qr-input.component';

describe('UrlQrInputComponent', () => {
  let component: UrlQrInputComponent;
  let fixture: ComponentFixture<UrlQrInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrlQrInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlQrInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
