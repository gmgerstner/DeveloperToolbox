import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRCodesComponent } from './qrcodes.component';

describe('QRCodesComponent', () => {
  let component: QRCodesComponent;
  let fixture: ComponentFixture<QRCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QRCodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QRCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
