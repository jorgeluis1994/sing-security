import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SessionDocument {
  name: string;
  size: number;
  type: string;
  dataUrl: string;
}

@Injectable({ providedIn: 'root' })
export class DocumentService {

  private SESSION_KEY = 'SIGN_SESSION_DOCS';

  constructor(private http: HttpClient) { }

  /* ==============================
     1️⃣ CARGAR PDF DESDE URL
     ============================== */
  loadPdf(url: string): Observable<Blob> {
    console.log('🌐 Cargando PDF desde URL:', url);
    return this.http.get(url, { responseType: 'blob' });
  }

  /* ==============================
     2️⃣ GUARDAR PDFS EN SESIÓN
     ============================== */
  async saveToSession(files: File[]): Promise<void> {
    const docs = await Promise.all(files.map(f => this.fileToBase64(f)));
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(docs));
    console.log('🗂️ PDFs guardados en sesión:', docs);
  }

  /* ==============================
     3️⃣ OBTENER PDFS DE SESIÓN
     ============================== */
  getFromSession(): SessionDocument[] {
    const raw = sessionStorage.getItem(this.SESSION_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  /* ==============================
     4️⃣ LIMPIAR SESIÓN
     ============================== */
  clearSession() {
    sessionStorage.removeItem(this.SESSION_KEY);
  }

  /* ==============================
     UTIL
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
