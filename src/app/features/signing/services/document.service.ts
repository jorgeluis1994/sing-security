import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SessionDocument {
  name: string;
  size: number;
  type: string;
  dataUrl: string;
}

@Injectable({ providedIn: 'root' })
export class DocumentService {

  private SESSION_KEY = 'SIGN_SESSION_DOCS';

  // 🧠 Estado reactivo
  private docsSubject = new BehaviorSubject<SessionDocument[]>([]);
  docs$ = this.docsSubject.asObservable();

  constructor(private http: HttpClient) {
    // 🔁 Hidratar desde sesión al iniciar
    const saved = sessionStorage.getItem(this.SESSION_KEY);
    if (saved) {
      this.docsSubject.next(JSON.parse(saved));
    }
  }

  /* ==============================
     🌐 CARGAR PDF DESDE URL
     ============================== */
  loadPdf(url: string): Observable<Blob> {
    console.log('🌐 Cargando PDF desde URL:', url);
    return this.http.get(url, { responseType: 'blob' });
  }

  /* ==============================
     🔁 REEMPLAZAR TODO (uso puntual)
     ============================== */
  async saveToSession(files: File[]): Promise<void> {
    const docs = await Promise.all(files.map(f => this.fileToBase64(f)));
    this.setDocs(docs);
    console.log('🗂️ PDFs guardados en sesión:', docs);
  }

  /* ==============================
     ➕ AGREGAR NUEVOS (CLAVE)
     ============================== */
  async addFiles(files: File[]): Promise<void> {
    const existing = this.docsSubject.value;

    const newDocs = await Promise.all(
      files.map(f => this.fileToBase64(f))
    );

    this.setDocs([...existing, ...newDocs]);
  }

  /* ==============================
     ❌ ELIMINAR UNO
     ============================== */
  removeAt(index: number): void {
    const docs = [...this.docsSubject.value];
    docs.splice(index, 1);
    this.setDocs(docs);
  }

  /* ==============================
     📥 OBTENER ACTUAL (sync)
     ============================== */
  getFromSession(): SessionDocument[] {
    return this.docsSubject.value;
  }

  /* ==============================
     🧹 LIMPIAR TODO
     ============================== */
  clearSession(): void {
    this.setDocs([]);
  }

  /* ==============================
     🧠 SET CENTRALIZADO
     ============================== */
  private setDocs(docs: SessionDocument[]): void {
    this.docsSubject.next(docs);
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(docs));
  }

  /* ==============================
     🔧 UTIL
     ============================== */
  private fileToBase64(file: File): Promise<SessionDocument> {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          name: file.name,
          size: file.size,
          type: file.type,
          dataUrl: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    });
  }
}
