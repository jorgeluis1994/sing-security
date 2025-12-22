import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStepper } from './app-stepper';

describe('AppStepper', () => {
  let component: AppStepper;
  let fixture: ComponentFixture<AppStepper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStepper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppStepper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
