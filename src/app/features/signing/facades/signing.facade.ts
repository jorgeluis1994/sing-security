import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionDocument } from '../services/document.service';
import { SignatureMark } from '../../../shared/components/pdf-preview-list/pdf-preview/pdf-preview';
import { SignatureService } from '../services/signature.service';
import { SignDocumentPayload } from '../models/signature.model';

@Injectable({ providedIn: 'root' })
export class SigningFacade {

  private readonly signatureService = inject(SignatureService);

  // ================= STATE (PRIVATE) =================
  private readonly activeStepSubject = new BehaviorSubject<number>(0);
  private readonly documentsSubject = new BehaviorSubject<SessionDocument[]>([]);
  private readonly htmlSubject = new BehaviorSubject<string | null>(null);
  private readonly signaturesSubject = new BehaviorSubject<SignatureMark[]>([]);
  private readonly certificateSubject = new BehaviorSubject<{
    file: File;
    password: string;
  } | null>(null);

  // ================= PUBLIC STREAMS =================
  readonly activeStep$ = this.activeStepSubject.asObservable();
  readonly documents$ = this.documentsSubject.asObservable();
  readonly html$ = this.htmlSubject.asObservable();
  readonly signatures$ = this.signaturesSubject.asObservable();

  // ================= STEP LOGIC =================
  goToStep(step: number) {
    if (step < 0) return;

    if (step > this.activeStepSubject.value && !this.canAdvance()) {
      return;
    }

    this.activeStepSubject.next(step);
  }

  canAdvance(): boolean {
    switch (this.activeStepSubject.value) {
      case 1:
        return this.documentsSubject.value.length > 0;
      case 4:
        return this.signaturesSubject.value.length > 0;
      default:
        return true;
    }
  }

  // ================= DATA =================
  setDocuments(docs: SessionDocument[]) {
    this.documentsSubject.next(docs);
  }

  setHtml(html: string) {
    this.htmlSubject.next(html);
  }

  addSignature(mark: SignatureMark) {
    this.signaturesSubject.next([
      ...this.signaturesSubject.value,
      mark
    ]);
  }

  // ================= ACTION =================
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
      certificate: {
        file: cert.file,
        password: cert.password,
      },
      positions,
    };

    return this.signatureService.signDocument(payload);
  }
}


