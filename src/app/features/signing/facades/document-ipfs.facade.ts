import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { DocumentIpfsService } from '../services/document-ipfs.service';
import { LoadingService } from '../../../core/services/loading.service';


// =======================================================
// 📄 MODELO ÚNICO DE DOCUMENTO EN EL FLUJO DE FIRMA
// =======================================================
export interface IpfsDocument {

  // =====================
  // 📄 METADATA
  // =====================
  name: string;
  size: number;
  type: string;

  // =====================
  // 🧠 ESTADO LOCAL (UI)
  // =====================
  file?: File;           // temporal (antes de subir)
  blobUrl: string;       // preview inmediato
  dataUrl: string;       // base64 SOLO para preview local

  // =====================
  // ☁️ IPFS (FUENTE REAL)
  // =====================
  cid?: string;
  ipfsUrl?: string;

  // =====================
  // 🔄 ESTADOS DEL FLUJO
  // =====================
  uploaded?: boolean;
  uploading?: boolean;
  analyzing?: boolean;
  signed?: boolean;
}


@Injectable({ providedIn: 'root' })
export class DocumentIpfsFacade {

  // ========================
  // 🔧 DEPENDENCIAS
  // ========================
  private readonly ipfsService = inject(DocumentIpfsService);
  private readonly loading = inject(LoadingService);

  private readonly uploadingSubject = new BehaviorSubject<boolean>(false);

  // ========================
  // 🧠 STATE PRIVADO
  // ========================
  private readonly documentsSubject = new BehaviorSubject<IpfsDocument[]>([]);
  private readonly errorSubject = new BehaviorSubject<string | null>(null);

  // ========================
  // 🌍 STATE PÚBLICO
  // ========================
  readonly documents$ = this.documentsSubject.asObservable();
  readonly error$ = this.errorSubject.asObservable();


  // =======================================================
  // 📥 DOCUMENTOS
  // =======================================================
  setDocuments(docs: IpfsDocument[]): void {
    this.documentsSubject.next(docs);
  }

  addDocuments(docs: IpfsDocument[]): void {
    this.documentsSubject.next([
      ...this.documentsSubject.value,
      ...docs
    ]);
  }

  removeAt(index: number): void {
    const updated = [...this.documentsSubject.value];
    updated.splice(index, 1);
    this.documentsSubject.next(updated);
  }

  clearAll(): void {
    this.documentsSubject.next([]);
  }


  // =======================================================
  // ☁️ SUBIDA A IPFS (REAL)
  // =======================================================
  uploadToIpfs(doc: IpfsDocument): void {

    // Validación básica
    if (!doc.file) return;

    // Ya subido → no repetir
    if (doc.ipfsUrl) return;

    // Marcar estado
    this.updateDocument(doc, { uploading: true });
    this.loading.show('Subiendo documento a IPFS...');

    this.ipfsService
      .uploadPdfToIpfs(doc.file)
      .pipe(
        finalize(() => {
          this.loading.hide();
        })
      )
      .subscribe({
        next: (resp) => {
          this.updateDocument(doc, {
            ipfsUrl: resp.url,
            cid: this.extractCid(resp.url),
            uploaded: true,
            uploading: false,
            file: undefined, // 🔥 liberar memoria
          });
        },
        error: () => {
          this.updateDocument(doc, { uploading: false });
          this.errorSubject.next('❌ Error subiendo documento a IPFS');
        }
      });
  }


  // =======================================================
  // 🚀 SUBIR TODOS (ÚTIL AL CAMBIAR DE STEP)
  // =======================================================
  uploadAll(): void {
    this.documentsSubject.value.forEach(doc => {
      if (!doc.ipfsUrl) {
        this.uploadToIpfs(doc);
      }
    });
  }


  // =======================================================
  // ❓ HELPERS
  // =======================================================
  hasIpfs(doc: IpfsDocument): boolean {
    return !!doc.ipfsUrl;
  }

  clearError(): void {
    this.errorSubject.next(null);
  }


  // =======================================================
  // 🔧 PRIVADOS
  // =======================================================
  private updateDocument(
    target: IpfsDocument,
    patch: Partial<IpfsDocument>
  ): void {
    const updated = this.documentsSubject.value.map(d =>
      d === target ? { ...d, ...patch } : d
    );
    this.documentsSubject.next(updated);
  }

  private extractCid(ipfsUrl: string): string {
    try {
      return ipfsUrl.split('/').pop()!;
    } catch {
      return '';
    }
  }

  isUploading(): boolean {
    return this.uploadingSubject.value;
  }
}
