import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingPdf } from './sing-pdf';

describe('SingPdf', () => {
  let component: SingPdf;
  let fixture: ComponentFixture<SingPdf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingPdf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingPdf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
