import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatePdf } from './validate-pdf';

describe('ValidatePdf', () => {
  let component: ValidatePdf;
  let fixture: ComponentFixture<ValidatePdf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidatePdf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidatePdf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
