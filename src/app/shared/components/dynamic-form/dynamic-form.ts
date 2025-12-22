import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
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

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    SelectModule,
    RadioButtonModule
  ],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.css',
})
export class DynamicForm implements OnChanges {

  // 🔹 Llega el FORMULARIO COMPLETO
  @Input() formConfig!: DynamicFormConfig;

  // 🔹 Página actual (por ahora fija)
  @Input() pageIndex = 0;

  // 🔹 Campos reales a renderizar
  fields: DynamicField[] = [];

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(): void {
    
    if (!this.formConfig) return;

    // 🔹 Extraemos los campos de la página actual
    this.fields = this.formConfig.pages[this.pageIndex];

    const group: Record<string, any> = {};

    this.fields.forEach((field: DynamicField) => {
      group[field.var_answer] = field.name.includes('*')
        ? ['', Validators.required]
        : [''];
    });

    this.form = this.fb.group(group);

    console.log('FORM VALUE:', this.form.value);
  }
}
