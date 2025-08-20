import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GUIDGeneratorComponent } from './guidgenerator.component';

describe('GUIDGeneratorComponent', () => {
  let component: GUIDGeneratorComponent;
  let fixture: ComponentFixture<GUIDGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GUIDGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GUIDGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
