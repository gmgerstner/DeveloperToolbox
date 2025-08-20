import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringEncoderComponent } from './string-encoder.component';

describe('StringEncoderComponent', () => {
  let component: StringEncoderComponent;
  let fixture: ComponentFixture<StringEncoderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StringEncoderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StringEncoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
