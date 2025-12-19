import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { NgxExtendedPdfViewerModule  } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-pdf-preview',
  imports: [

    CommonModule,
    NgxExtendedPdfViewerModule ,
    CardModule,
    ToolbarModule,
    ButtonModule,
    SkeletonModule,
    TagModule
  ],
  templateUrl: './pdf-preview.html',
  styleUrl: './pdf-preview.css',
})
export class PdfPreview {

  /** Blob o URL segura */
  @Input() pdfSrc!: Blob | string;

  loading = true;
  hasReachedEnd = false;

  ngOnInit() {}

  onPdfLoaded() {
    this.loading = false;
  }

  onScroll(event: any) {
    const el = event.target;
    const atBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight - 10;

    if (atBottom) {
      this.hasReachedEnd = true;
    }
  }

}
