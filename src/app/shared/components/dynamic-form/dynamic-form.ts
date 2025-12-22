import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { InputText } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { RadioButton } from 'primeng/radiobutton';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputText,
    SelectModule,
    RadioButton
  ],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.css',
})
export class DynamicForm implements OnInit {

  @Input() pageFields: any[] = [];
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const group: Record<string, any> = {};

    this.pageFields.forEach(field => {
      group[field.var_answer] = field.name?.includes('*')
        ? ['', Validators.required]
        : [''];
    });

    this.form = this.fb.group(group);
  }
}
