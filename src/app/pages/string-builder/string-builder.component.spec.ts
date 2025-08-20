import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringBuilderComponent } from './string-builder.component';

describe('StringBuilderComponent', () => {
  let component: StringBuilderComponent;
  let fixture: ComponentFixture<StringBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StringBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StringBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
