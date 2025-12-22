import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfPreviewList } from './pdf-preview-list';

describe('PdfPreviewList', () => {
  let component: PdfPreviewList;
  let fixture: ComponentFixture<PdfPreviewList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfPreviewList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfPreviewList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
