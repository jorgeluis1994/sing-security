import { Component, EventEmitter, Output, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PdfPreview, SignatureMark } from '../pdf-preview/pdf-preview';
import { CardModule } from 'primeng/card';
import { SigningFacade } from '../../../features/signing/facades/signing.facade';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sing-pdf',
  standalone: true,
  imports: [CommonModule, ButtonModule, PdfPreview, CardModule],
  templateUrl: './sing-pdf.html',
})
export class SingPdf implements OnInit {

  public readonly facade = inject(SigningFacade);

  @Output() signaturePosition = new EventEmitter<SignatureMark>();

  /** 🔁 fuerza recarga del visor */
  pdfKey = 1;

  document = {
    name: 'Documento IPFS de prueba',
    pdfUrl: 'https://doc.firmasegura.work:8280/ipfs/QmTeY3esKmvdDd6FcJ6iWhqSkrqtcLdjB5iJyfup4sMrK8'
  };

  signatures: SignatureMark[] = [];

  ngOnInit() {
    fetch(this.document.pdfUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error('Error descargando PDF');
        }
        return res.blob();
      })
      .then(blob => {
        const reader = new FileReader();

        reader.onload = () => {
          this.facade.setDocuments([{
            name: this.document.name,
            dataUrl: reader.result as string,
            size: blob.size,
            type: blob.type || 'application/pdf',
          }]);

          console.log('📄 PDF cargado en SigningFacade');
        };

        reader.readAsDataURL(blob);
      })
      .catch(err => {
        console.error('❌ Error cargando PDF desde IPFS', err);
      });
  }

  // 📍 viene del PdfPreview
  onSignatureMarked(mark: SignatureMark) {
    this.signatures.push(mark);
    this.facade.addSignature(mark);
  }

  // 🔐 BOTÓN FIRMAR
  onSign() {
    this.facade.signGraphological('Jorge Luis').subscribe({
      next: (result: { pdfUrl: string; semanticHash?: string }) => {

        console.log('✅ Documento firmado', result);

        // 🔄 reemplazamos el documento por el PDF firmado
        this.facade.setDocuments([{
          name: 'documento-firmado.pdf',
          size: 0,
          type: 'application/pdf',
          dataUrl: result.pdfUrl, // 👈 URL IPFS
        }]);

        // 🔁 fuerza recarga del visor
        this.pdfKey++;

        console.log('🔐 Hash semántico:', result.semanticHash);
      },
      error: (err) => {
        console.error('❌ Error al firmar', err);
      }
    });
  }
}
