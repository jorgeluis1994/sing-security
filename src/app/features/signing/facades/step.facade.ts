import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class StepFacade {

  private readonly activeStepSubject = new BehaviorSubject<number>(0);

  private readonly step$ = new BehaviorSubject<number>(0);
  readonly activeStep$ = this.step$.asObservable();

  private readonly MAX_STEP = 3;

  goTo(step: number): void {
    if (step < 0) return;
    if (step > this.MAX_STEP) return;

    this.step$.next(step);
  }

  get currentStep(): number {
    return this.activeStepSubject.value;
  }

  canAdvance(): boolean {
    return this.step$.value < this.MAX_STEP;
  }

  // 👇 EXPONER ESTADO ACTUAL (sync)
  getActiveStep(): number {
    return this.activeStepSubject.value;
  }


}
