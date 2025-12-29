import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, finalize, tap } from 'rxjs';

import { SessionDocument } from '../services/document.service';
import { SignatureMark } from '../../../shared/components/pdf-preview/pdf-preview';
import { SignatureService } from '../services/signature.service';
import {
  SignDocumentPayload,
  SignGraphologicalPayload
} from '../models/signature.model';
import { LoadingService } from '../../../core/services/loading.service';
import { DocuemntAnalyzeService } from '../services/docuemnt-analyze.service';

@Injectable({ providedIn: 'root' })
export class SigningFacade {

  private readonly analyzeService = inject(DocuemntAnalyzeService);
  private readonly signatureService = inject(SignatureService);
  private readonly loading = inject(LoadingService);

  // ================= ANALYZE STATE =================
  private analyzeResults: Record<string, any> = {};
  private analyzing: Record<string, boolean> = {};

  // ================= STATE =================
  private readonly documentsSubject = new BehaviorSubject<SessionDocument[]>([]);
  private readonly signaturesSubject = new BehaviorSubject<SignatureMark[]>([]);
  private readonly certificateSubject = new BehaviorSubject<{
    file: File;
    password: string;
  } | null>(null);

  // ================= STREAMS =================
  readonly documents$ = this.documentsSubject.asObservable();
  readonly signatures$ = this.signaturesSubject.asObservable();

  // ================= DATA =================
  setDocuments(docs: SessionDocument[]) {
    this.documentsSubject.next(docs);
  }

  addSignature(mark: SignatureMark) {
    this.signaturesSubject.next([
      ...this.signaturesSubject.value,
      mark
    ]);
  }

  setCertificate(file: File, password: string) {
    this.certificateSubject.next({ file, password });
  }

  // ================= ACTIONS =================
  sign() {
    const pdf = this.documentsSubject.value[0];
    const cert = this.certificateSubject.value;
    const positions = this.signaturesSubject.value;

    if (!pdf || !cert || !positions.length) {
      throw new Error('❌ Datos incompletos para firmar');
    }

    const payload: SignDocumentPayload = {
      pdf: {
        name: pdf.name,
        dataUrl: pdf.dataUrl,
      },
      certificate: cert,
      positions,
    };

    this.loading.show('Firmando documento digitalmente...');

    return this.signatureService.signDocument(payload).pipe(
      finalize(() => this.loading.hide())
    );
  }

signGraphological(fullName: string) {
  const pdf = this.documentsSubject.value[0];
  const positions = this.signaturesSubject.value;

  if (!pdf || !fullName || !positions.length) {
    throw new Error('❌ Datos incompletos para firma grafológica');
  }

  const payload: SignGraphologicalPayload = {
    pdf: {
      name: pdf.name,
      dataUrl: pdf.dataUrl,
    },
    fullName,
    position: positions[0],
  };

  this.loading.show('Firmando documento grafológicamente...');

  return this.signatureService.signGraphological(payload).pipe(
    tap(() => {
      // 👇 cuando ya firmó
      this.loading.hide();
      this.loading.show('Firma completada, procesando documento...');
    }),
    finalize(() => {
      // 👇 al final de todo
      this.loading.hide();
    })
  );
}


  // ================= ANALYZE =================
  analyzeDocument(doc: SessionDocument): void {
    if (!doc || this.analyzing[doc.name]) return;

    this.analyzing[doc.name] = true;
    this.loading.show('Analizando documento...');

    const file = this.dataUrlToFile(doc);

    this.analyzeService.analyzePdf(file).pipe(
      finalize(() => {
        this.analyzing[doc.name] = false;
        this.loading.hide();
      })
    ).subscribe({
      next: result => {
        this.analyzeResults[doc.name] = result;
      },
      error: err => {
        console.error('❌ Error analizando documento', err);
      }
    });
  }

  hasAnalysis(doc: SessionDocument): boolean {
    return !!this.analyzeResults[doc.name];
  }

  isAnalyzing(doc: SessionDocument): boolean {
    return !!this.analyzing[doc.name];
  }

  getAnalysis(doc: SessionDocument): any {
    return this.analyzeResults[doc.name];
  }

  // ================= UTILS =================
  private dataUrlToFile(doc: SessionDocument): File {
    const [meta, base64] = doc.dataUrl.split(',');
    const mime = meta.match(/:(.*?);/)![1];
    const bytes = atob(base64);
    const buffer = new Uint8Array(bytes.length);

    for (let i = 0; i < bytes.length; i++) {
      buffer[i] = bytes.charCodeAt(i);
    }

    return new File([buffer], doc.name, { type: mime });
  }
}
