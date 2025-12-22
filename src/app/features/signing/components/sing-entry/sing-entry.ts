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
    CardModule
  ],
  templateUrl: './sing-entry.html',
  styleUrl: './sing-entry.css',
})
export class SingEntry implements OnInit {

  // Servicios
  private documentService = inject(DocumentService);

  formDinamic = [
    {
      "name": "Completar la siguiente información requerida. Los campos marcados con ( * ) son obligatorios",
      "role": "acquirer",
      "pages": [
        [
          {
            "id": 1,
            "name": "Nombre *",
            "type": "Text",
            "class": "",
            "items": [],
            "style": "",
            "weight": [],
            "attributes": [],
            "var_answer": "var_first_name",
            "description": ""
          },
          {
            "id": 2,
            "name": "Apellido *",
            "type": "Text",
            "class": "",
            "items": [],
            "style": "",
            "weight": [],
            "attributes": [],
            "var_answer": "var_last_name",
            "description": ""
          },
          {
            "id": 3,
            "name": "Tipo de Identificación *",
            "type": "Radio",
            "class": "",
            "items": ["Cédula", "RUC"],
            "style": "",
            "weight": [0, 1],
            "attributes": [],
            "var_answer": "rad_identification_type",
            "description": ""
          },
          {
            "id": 4,
            "name": "Número de Identificación (Cédula o RUC) *",
            "type": "Text",
            "class": "",
            "items": [],
            "style": "",
            "weight": [],
            "attributes": [],
            "var_answer": "var_identification_number",
            "description": ""
          }
        ]
      ],
      "description": ""
    }
  ]


  // Stepper
  steps = [
    { label: 'Información', icon: 'pi pi-user' },
    { label: 'Subir documentos', icon: 'pi pi-upload' },
    { label: 'Visualizar documentos', icon: 'pi pi-file-pdf' }
  ];

  activeStep = 0;


  // Data
  pdfDocs: SessionDocument[] = [];

  ngOnInit(): void {
    // Cargar documentos desde sesión
    this.pdfDocs = this.documentService.getFromSession();
  }

  // Control de navegación entre pasos
  goToStep(step: number): void {
    if (step < this.activeStep) {
      this.activeStep = step;
      return;
    }

    if (!this.canAdvance()) return;

    this.activeStep = step;
  }

  // Validaciones al avanzar
  canAdvance(): boolean {
    return true;
  }

}
