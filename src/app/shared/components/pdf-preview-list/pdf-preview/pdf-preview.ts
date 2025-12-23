import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';


export interface SignatureMark {
  page: number;
  x: number;
  y: number;
}

@Component({
  selector: 'app-pdf-preview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxExtendedPdfViewerModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    SkeletonModule,
    TagModule,
    ToggleSwitchModule
  ],
  templateUrl: './pdf-preview.html',
  styleUrl: './pdf-preview.css',
})
export class PdfPreview implements OnInit {

  /** URL del PDF (blob: o https) */
  @Input({ required: true }) pdfSrc!: string;

  /** Emite cada firma capturada */
  @Output() signaturePosition = new EventEmitter<SignatureMark>();

  loading = true;
  hasReachedEnd = false;

  /** Control del modo firma */
  signatureMode = false;

  /** Múltiples firmas */
  signatureMarks: SignatureMark[] = [];

  /** Límite de firmas (opcional) */
  maxSignatures = 5;

  ngOnInit(): void {
    if (!this.pdfSrc) {
      console.error('❌ pdfSrc llegó vacío o undefined');
    }
  }

  onPdfLoaded() {
    this.loading = false;
    console.log('✅ PDF renderizado correctamente');
  }

  onScroll(event: any) {
    const el = event.target;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
      this.hasReachedEnd = true;
    }
  }

  /** Activa el modo firma */
  onToggleSignature(enabled: boolean) {
    if (enabled) {
      if (this.signatureMarks.length >= this.maxSignatures) {
        console.warn('⚠️ Límite de firmas alcanzado');
        this.signatureMode = false;
        return;
      }

      console.log('✍️ Modo firma activado');
    } else {
      console.log('🚫 Modo firma desactivado');
    }
  }


  onPdfClick(event: MouseEvent) {
    if (!this.signatureMode) return;

    const target = event.target as HTMLElement;

    // Página del PDF
    const pageElement = target.closest('.page') as HTMLElement;
    if (!pageElement) return;

    const pageNumber = Number(pageElement.getAttribute('data-page-number'));

    // Coordenadas RELATIVAS A LA PÁGINA
    const pageRect = pageElement.getBoundingClientRect();

    const x = event.clientX - pageRect.left;
    const y = event.clientY - pageRect.top;

    const mark: SignatureMark = {
      page: pageNumber,
      x,
      y
    };

    this.signatureMarks.push(mark);
    this.signaturePosition.emit(mark);

    console.log('📍 Firma capturada correctamente:', mark);

    // Apagar modo firma
    this.signatureMode = false;
  }


  /** Eliminar firma por error */
  removeSignature(index: number) {
    this.signatureMarks.splice(index, 1);
    console.log('❌ Firma eliminada', index);
  }
}
