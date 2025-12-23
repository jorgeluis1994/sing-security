import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';

import { AppStepper } from '../../../../shared/components/app-stepper/app-stepper';
import { UploadDocuments } from '../../../../shared/components/upload-documents/upload-documents';
import { PdfPreviewList } from '../../../../shared/components/pdf-preview-list/pdf-preview-list';
import { ToolbarModule } from 'primeng/toolbar';

import { DocumentService, SessionDocument } from '../../services/document.service';
import { DynamicForm } from "../../../../shared/components/dynamic-form/dynamic-form";
import { DynamicFormConfig } from '../../../../shared/models/forms-dynamic.entity';
import { ValidatePdf } from "../../../../shared/components/validate-pdf/validate-pdf";
import { SingPdf } from "../../../../shared/components/sing-pdf/sing-pdf";

@Component({
  selector: 'app-sing-entry',
  standalone: true,
  imports: [
    CommonModule,
    StepsModule,
    ButtonModule,
    AppStepper,
    UploadDocuments,
    PdfPreviewList,
    ToolbarModule,
    DynamicForm,
    CardModule,
    ValidatePdf,
    SingPdf
  ],
  templateUrl: './sing-entry.html',
  styleUrl: './sing-entry.css',
})
export class SingEntry implements OnInit {

  private documentService = inject(DocumentService);

  // formDinamic: DynamicFormConfig[] = [ /* igual que ahora */];

  // 🔹 FORM ACTUAL
  formDinamic: DynamicFormConfig[] = [
    {
      name: 'Completar la siguiente información requerida. Los campos marcados con ( * ) son obligatorios',
      role: 'acquirer',
      pages: [
        [
          {
            id: 4,
            name: 'Número de Identificación (Cédula o RUC) *',
            type: 'Text',
            class: 'col-12',
            items: [],
            style: '',
            weight: [],
            attributes: [],
            var_answer: 'var_identification_number',
            description: ''
          }
        ]
      ],
      description: ''
    }
  ];

  currentForm!: DynamicFormConfig;


  currentPageIndex = 0;

  steps = [
    { label: 'Información', icon: 'pi pi-briefcase' },
    { label: 'Subir documentos', icon: 'pi pi-folder-open' },
    { label: 'Visualizar documentos', icon: 'pi pi-file-pdf' },
    { label: 'Validación documentos', icon: 'pi pi-check-square' },
    { label: 'Firma de inscripción', icon: 'pi pi-file-signature' }
  ];




  activeStep = 0;
  pdfDocs: SessionDocument[] = [];

  ngOnInit(): void {
    this.currentForm = this.formDinamic[0];
    this.documentService.docs$.subscribe(docs => {
      this.pdfDocs = docs;
    });
  }

  goToStep(step: number): void {
    if (step < this.activeStep) {
      this.activeStep = step;
      return;
    }

    if (!this.canAdvance()) return;

    this.activeStep = step;
  }

  canAdvance(): boolean {
    return true;
  }

}
