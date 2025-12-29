import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PdfPreview, SignatureMark } from "../pdf-preview/pdf-preview";
import { CardModule } from 'primeng/card';
import { SigningFacade } from '../../../features/signing/facades/signing.facade';

@Component({
  selector: 'app-sing-pdf',
  standalone: true,
  imports: [ButtonModule, PdfPreview, CardModule],

  templateUrl: './sing-pdf.html',
})
export class SingPdf {

  private readonly facade = inject(SigningFacade);

  @Output() signaturePosition = new EventEmitter<SignatureMark>();

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
          size: blob.size,          // ✅ tamaño real
          type: blob.type || 'application/pdf', // ✅ tipo real
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
    this.facade.addSignature(mark);   // 🔥 guardamos en el facade
  }

  // 🔐 BOTÓN FIRMAR
  onSign() {

    
    this.facade.signGraphological('Jorge Luis').subscribe({
      next: (result) => {
        console.log('✅ Documento firmado', result);
        // aquí: descargar, mostrar, subir IPFS, navegar, etc
      },
      error: (err) => {
        console.error('❌ Error al firmar', err);
      }
    });
  }

}
