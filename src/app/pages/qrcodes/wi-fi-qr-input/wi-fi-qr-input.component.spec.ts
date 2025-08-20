import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiFiQrInputComponent } from './wi-fi-qr-input.component';

describe('WiFiQrInputComponent', () => {
  let component: WiFiQrInputComponent;
  let fixture: ComponentFixture<WiFiQrInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WiFiQrInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WiFiQrInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
