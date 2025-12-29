import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';

import { DynamicFormConfig, DynamicField } from '../../models/forms-dynamic.entity';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    SelectModule,
    RadioButtonModule,
    CardModule
  ],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.css',
})
export class DynamicForm implements OnChanges {

  @Input() formConfig!: DynamicFormConfig;
  @Input() pageIndex = 0;

  @Output() validChange = new EventEmitter<boolean>();

  fields: DynamicField[] = [];
  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnChanges(): void {
    if (!this.formConfig) return;

    this.fields = this.formConfig.pages[this.pageIndex];

    const group: Record<string, any> = {};

    this.fields.forEach(field => {
      group[field.var_answer] = field.name.includes('*')
        ? ['', Validators.required]
        : [''];
    });

    this.form = this.fb.group(group);
  

    // 🔔 avisamos al exterior
    this.validChange.emit(this.form.valid);

    this.form.statusChanges.subscribe(() => {
      this.validChange.emit(this.form.valid);
    });
  }
}
