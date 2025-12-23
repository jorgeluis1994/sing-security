import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SignDocumentPayload } from '../models/signature.model';


@Injectable({ providedIn: 'root' })
export class SignatureService {

  private readonly baseUrl = environment.api.baseUrl;
  private readonly signUrl = environment.signature.endpoints.sign;

  constructor(private http: HttpClient) {}

  signDocument(payload: SignDocumentPayload) {
    const formData = this.buildFormData(payload);

    return this.http.post(
      `${this.baseUrl}${this.signUrl}`,
      formData
    );
  }

  // =========================
  // 🔒 MÉTODO PRIVADO
  // =========================
  private buildFormData(payload: SignDocumentPayload): FormData {
    const formData = new FormData();

    // PDF
    const pdfBlob = this.dataUrlToBlob(payload.pdf.dataUrl);
    formData.append('pdfFile', pdfBlob, payload.pdf.name);

    // Certificado
    formData.append('p12File', payload.certificate.file);
    formData.append('password', payload.certificate.password);

    // Posiciones
    formData.append(
      'signaturePositions',
      JSON.stringify(payload.positions)
    );

    return formData;
  }

  private dataUrlToBlob(dataUrl: string): Blob {
    const [meta, base64] = dataUrl.split(',');
    const mime = meta.match(/:(.*?);/)![1];
    const binary = atob(base64);
    const buffer = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
      buffer[i] = binary.charCodeAt(i);
    }

    return new Blob([buffer], { type: mime });
  }
}
