import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

export interface SignatureMark {
  page: number;   // 1-based (frontend)
  x: number;      // 0–1
  y: number;      // 0–1
  width?: number;
  height?: number;
}

@Component({
  selector: 'app-pdf-preview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ToolbarModule,
    ToggleSwitchModule,
    NgxExtendedPdfViewerModule
  ],
  templateUrl: './pdf-preview.html',
  styleUrl: './pdf-preview.css'
})
export class PdfPreview implements OnInit {

  @Input({ required: true }) pdfSrc!: string;
  @Output() signaturePosition = new EventEmitter<SignatureMark>();

  

  loading = true;
  signatureMode = false;

  signatureMarks: SignatureMark[] = [];
  maxSignatures = 5;

  ngOnInit(): void {
    if (!this.pdfSrc) {
      console.error('❌ pdfSrc llegó vacío');
    }
  }

  // ✅ PDF ya renderizado
  onPdfLoaded(): void {
    this.loading = false;
    console.log('✅ PDF renderizado');

    // 🔥 escuchar clicks a nivel documento (MÁS SEGURO)
    document.addEventListener(
      'click',
      this.onPdfClick.bind(this)
    );
  }

  onToggleSignature(enabled: boolean): void {
    if (enabled && this.signatureMarks.length >= this.maxSignatures) {
      console.warn('⚠️ Límite de firmas alcanzado');
      this.signatureMode = false;
      return;
    }
    this.signatureMode = enabled;
  }

  // ============================
  // 🔥 CAPTURA REAL DEL CLICK
  // ============================
  onPdfClick(event: MouseEvent): void {
    if (!this.signatureMode) return;

    const elements = document.elementsFromPoint(
      event.clientX,
      event.clientY
    );

    const pageElement = elements.find(el =>
      el.classList.contains('page')
    ) as HTMLElement;

    if (!pageElement) return;

    const pageNumber = Number(
      pageElement.getAttribute('data-page-number')
    );

    const rect = pageElement.getBoundingClientRect();

    const mark: SignatureMark = {
      page: pageNumber, // frontend = 1-based
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    };

    console.log('📍 Firma capturada:', mark);

    this.signatureMarks.push(mark);
    this.signaturePosition.emit(mark);

    this.drawMarker(pageElement, mark);

    // salir de modo firma
    this.signatureMode = false;
  }

  // ============================
  // 🖊️ DIBUJAR MARCADOR
  // ============================
  private drawMarker(page: HTMLElement, mark: SignatureMark): void {

    // eliminar marcador previo
    page.querySelector('.signature-marker')?.remove();

    const marker = document.createElement('div');
    marker.className = 'signature-marker';

    marker.style.left = `${mark.x * 100}%`;
    marker.style.top = `${mark.y * 100}%`;

    marker.innerHTML = `
    <span class="signature-label">Firma</span>
    <button class="signature-remove">✕</button>
  `;

    // botón borrar
    const removeBtn = marker.querySelector('.signature-remove') as HTMLButtonElement;
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();     // no dispara click del PDF
      marker.remove();
      this.signatureMarks.pop(); // o filtra por page/x/y
      console.log('❌ Marcador eliminado');
    });

    page.appendChild(marker);

    console.log('✅ Marcador dibujado', marker);
  }


}
