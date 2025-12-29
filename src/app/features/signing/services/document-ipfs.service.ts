import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocumentIpfsService {

  private readonly baseUrl = environment.externalApis.ipfsFilw.baseUrl;
  private readonly endpoint = environment.externalApis.ipfsFilw.endpoints.buffer;

  constructor(private http: HttpClient) {}

  /* =========================
   * 📦 SUBIR PDF A IPFS
   * (igual que NestJS)
   * ========================= */
  uploadPdfToIpfs(pdfBlob: Blob): Observable<{ url: string; created_at: string }> {
    const formData = new FormData();

    // 👇 MISMO nombre que en NestJS: 'files'
    formData.append(
      'files',
      pdfBlob,
      'documento.pdf'
    );

    // 👇 campo adicional que envías desde Nest
    formData.append('duplex', 'true');

    return this.http
      .post<any>(`${this.baseUrl}${this.endpoint}`, formData)
      .pipe(
        map(response => {
          const respData = response?.resp;

          if (Array.isArray(respData) && respData[0]?.ipfsUrl) {
            return {
              url: respData[0].ipfsUrl,
              created_at: new Date().toISOString(),
            };
          }

          throw new Error('Respuesta inválida o sin URL IPFS');
        })
      );
  }
}
