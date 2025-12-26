import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { SessionDocument } from '../services/document.service';
import { SignatureMark } from '../../../shared/components/pdf-preview/pdf-preview';
import { SignatureService } from '../services/signature.service';
import { SignDocumentPayload, SignGraphologicalPayload } from '../models/signature.model';
import { LoadingService } from '../../../core/services/loading.service';
import { DocuemntAnalyzeService } from '../services/docuemnt-analyze.service';

@Injectable({ providedIn: 'root' })
export class SigningFacade {

  private service = inject(DocuemntAnalyzeService);
  // ================= ANALYZE STATE =================
  private analyzeResults: { [docName: string]: any } = {};
  private analyzing: { [docName: string]: boolean } = {};





  private readonly loading = inject(LoadingService);

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

    this.loading.show('Firmando documento digitalmente...');

    return this.signatureService.signDocument(payload).pipe(
      finalize(() => this.loading.hide())
    );
  }

  // ================= ACTION =================
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
      position: positions[0], // solo una firma grafológica
    };

    this.loading.show('Firmando documento grafológicamente...');

    return this.signatureService.signGraphological(payload).pipe(
      finalize(() => this.loading.hide())
    );
  }

  analyzeDocument(doc: SessionDocument): void {
    if (!doc) return;

    // si ya se está analizando, no repetir
    if (this.analyzing[doc.name]) return;

    this.analyzing[doc.name] = true;
    this.loading.show('Analizando documento...');

    const file = this.dataUrlToFile(doc);

    this.service.analyzePdf(file).pipe(
      finalize(() => {
        this.analyzing[doc.name] = false;
        this.loading.hide();
      })
    ).subscribe({
      next: (result) => {
        // 🔥 guardamos el resultado de ESTE documento
        this.analyzeResults[doc.name] = result;
      },
      error: (err) => {
        console.error('❌ Error analizando documento', err);
      }
    });
  }


  private dataUrlToFile(doc: SessionDocument): File {
    const arr = doc.dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], doc.name, { type: mime });
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






}


