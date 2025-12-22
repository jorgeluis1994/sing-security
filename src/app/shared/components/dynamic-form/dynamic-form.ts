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

  @Input() pageFields: any[] = []; // aquí llega formDinamic
  fields: any[] = [];              // 👈 campos reales
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(): void {
    if (!this.pageFields?.length) return;

    // 🔹 extraemos SOLO los campos
    this.fields = this.pageFields[0].pages[0];

    const group: Record<string, any> = {};

    this.fields.forEach(field => {
      group[field.var_answer] = field.name?.includes('*')
        ? ['', Validators.required]
        : [''];
    });

    this.form = this.fb.group(group);

    console.log('FORM:', this.form.value);
  }
}
