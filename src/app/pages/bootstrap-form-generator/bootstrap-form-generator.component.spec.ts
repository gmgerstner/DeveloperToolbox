import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapFormGeneratorComponent } from './bootstrap-form-generator.component';

describe('BootstrapFormGeneratorComponent', () => {
  let component: BootstrapFormGeneratorComponent;
  let fixture: ComponentFixture<BootstrapFormGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BootstrapFormGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BootstrapFormGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
