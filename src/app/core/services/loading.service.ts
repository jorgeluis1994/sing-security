import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private messageSubject = new BehaviorSubject<string | null>(null);
  message$ = this.messageSubject.asObservable();

  show(message?: string): void {
    this.messageSubject.next(message ?? null);
    this.loadingSubject.next(true);
  }

  hide(): void {
    this.loadingSubject.next(false);
    this.messageSubject.next(null);
  }
}
