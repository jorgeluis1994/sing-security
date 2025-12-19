import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { StepsModule } from 'primeng/steps';
import { PdfPreview } from "../pdf-preview/pdf-preview";

@Component({
  selector: 'app-sing-entry',
  imports: [
    CommonModule,
    StepsModule,
    ButtonModule,
    PdfPreview,
    PdfPreview
],
  templateUrl: './sing-entry.html',
  styleUrl: './sing-entry.css',
})
export class SingEntry implements OnInit {
steps: MenuItem[] = [];
  activeIndex = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const tokenValid = this.route.snapshot.data['tokenValid'];

    if (tokenValid) {
      this.initSteps();
      this.activeIndex = 1; // saltamos validación
    }
  }

  initSteps() {
    this.steps = [
      { label: 'Validación' },
      { label: 'Documento' },
      { label: 'Firma' },
      { label: 'Confirmación' }
    ];
  }

  next() {
    if (this.activeIndex < this.steps.length - 1) {
      this.activeIndex++;
    }
  }

  back() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

}
