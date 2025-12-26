import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeDialog } from './analyze-dialog';

describe('AnalyzeDialog', () => {
  let component: AnalyzeDialog;
  let fixture: ComponentFixture<AnalyzeDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyzeDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyzeDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
