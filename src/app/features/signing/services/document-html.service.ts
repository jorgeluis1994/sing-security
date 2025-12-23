import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DocumentHtmlService {

  private html$ = new BehaviorSubject<string | null>(null);

  setHtml(html: string) {
    console.log('📦 HTML recibido en servicio:', html);
    this.html$.next(html);
  }

  getHtml() {
    return this.html$.asObservable();
  }
}
