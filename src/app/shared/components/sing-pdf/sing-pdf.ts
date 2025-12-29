import { Component, ElementRef, EventEmitter, Output, ViewChild, AfterViewInit } from '@angular/core';
import Quill from 'quill';
import { ButtonModule } from 'primeng/button';
import { PdfPreview, SignatureMark } from "../pdf-preview/pdf-preview";
import { CardModule } from 'primeng/card';
import { SessionDocument } from '../../../features/signing/services/document.service';

@Component({
  selector: 'app-sing-pdf',
  standalone: true,
  imports: [ButtonModule, PdfPreview, CardModule],

  templateUrl: './sing-pdf.html',
})
export class SingPdf {
  
  pdfUrl = 'assets/sample.pdf';

  @ViewChild('pdfPreview') pdfPreview!: PdfPreview;

  signatures: SignatureMark[] = [];

  selectedDoc!: SessionDocument;


  // 👉 botón Firmar
  markSignature(): void {
    if (!this.pdfPreview) return;

    this.pdfPreview.onToggleSignature(true);
  }

  // 👉 recibir posición
  onSignatureMarked(mark: SignatureMark): void {
    console.log('📨 Firma recibida en padre:', mark);
    this.signatures.push(mark);

    // aquí luego mandas al backend / IPFS
  }

}
