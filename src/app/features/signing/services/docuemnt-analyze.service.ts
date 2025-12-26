import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocuemntAnalyzeService {

  private http = inject(HttpClient)
  private readonly api = environment.externalApis.documentAnalysis;


  /**
   * 📄 Analiza un PDF usando API externa
   */
  analyzePdf(file: File): Observable<any> {
    const url = `${this.api.baseUrl}${this.api.endpoints.analyzePdf}`;

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(url, formData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * ❌ Manejo de errores centralizado
   */
  private handleError(error: HttpErrorResponse) {
    console.error('[DocumentAnalyzeService]', error);
    return throwError(() => error);
  }

}
