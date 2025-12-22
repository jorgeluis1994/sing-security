import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-pdf-preview',
  standalone: true,
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    SkeletonModule,
    TagModule
  ],
  templateUrl: './pdf-preview.html',
  styleUrl: './pdf-preview.css',
})
export class PdfPreview implements OnInit {

  /** URL del PDF (blob: o https) */
  @Input({ required: true }) pdfSrc!: string;

  loading = true;
  hasReachedEnd = false;

  ngOnInit(): void {

    if (!this.pdfSrc) {
      console.error('❌ pdfSrc llegó vacío o undefined');
    }

    if (this.pdfSrc?.startsWith('blob:')) {
      console.log('🟢 Es una Blob URL válida');
    } else if (this.pdfSrc?.startsWith('http')) {
      console.warn('🟡 Es URL http(s) — puede fallar por CORS');
    } else {
      console.error('🔴 Formato de pdfSrc no reconocido');
    }
  }

  onPdfLoaded() {
    console.log('✅ PDF renderizado correctamente');
    this.loading = false;
  }

  onScroll(event: any) {
    const el = event.target;
    const atBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight - 10;

    if (atBottom) {
      this.hasReachedEnd = true;
      console.log('📜 Usuario llegó al final del PDF');
    }
  }
}
