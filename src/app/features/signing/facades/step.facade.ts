import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StepFacade {

  private readonly STORAGE_KEY = 'signing-active-step';
  private readonly MAX_STEP = 3;

  private readonly stepSubject = new BehaviorSubject<number>(
    this.loadStep()
  );

  readonly activeStep$ = this.stepSubject.asObservable();

  get currentStep(): number {
    return this.stepSubject.value;
  }

  goTo(step: number): void {
    if (step < 0 || step > this.MAX_STEP) return;

    this.stepSubject.next(step);
    sessionStorage.setItem(this.STORAGE_KEY, step.toString());
  }

  canAdvance(): boolean {
    return this.currentStep < this.MAX_STEP;
  }

  reset(): void {
    this.stepSubject.next(0);
    sessionStorage.removeItem(this.STORAGE_KEY);
  }

  private loadStep(): number {
    const stored = sessionStorage.getItem(this.STORAGE_KEY);
    return stored ? Number(stored) : 0;
  }
}
