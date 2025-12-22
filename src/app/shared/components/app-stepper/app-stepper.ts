import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StepsModule } from 'primeng/steps';

@Component({
  selector: 'app-app-stepper',
  imports: [StepsModule],
  templateUrl: './app-stepper.html',
  styleUrl: './app-stepper.css',
})
export class AppStepper {

  @Input() steps: MenuItem[] = [];
  @Input() activeIndex = 0;
  @Input() readonly = true;

  @Output() stepChange = new EventEmitter<number>();

}
