import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StepperModule } from 'primeng/stepper';

@Component({
  selector: 'app-app-stepper',
  standalone: true,
  imports: [StepperModule],
  templateUrl: './app-stepper.html'
})
export class AppStepper {

  @Input() steps: { label: string; icon?: string }[] = [];
  @Input() activeIndex = 1; // Stepper usa valores desde 1

  @Output() stepChange = new EventEmitter<number>();

}
