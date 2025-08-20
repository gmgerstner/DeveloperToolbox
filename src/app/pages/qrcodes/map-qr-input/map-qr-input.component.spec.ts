import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapQrInputComponent } from './map-qr-input.component';

describe('MapQrInputComponent', () => {
  let component: MapQrInputComponent;
  let fixture: ComponentFixture<MapQrInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapQrInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapQrInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
