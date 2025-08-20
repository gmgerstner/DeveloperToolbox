import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarQrInputComponent } from './calendar-qr-input.component';

describe('CalendarQrInputComponent', () => {
  let component: CalendarQrInputComponent;
  let fixture: ComponentFixture<CalendarQrInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarQrInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarQrInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
