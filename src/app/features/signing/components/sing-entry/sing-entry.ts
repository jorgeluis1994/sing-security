import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { StepsModule } from 'primeng/steps';
import { PdfPreview } from '../pdf-preview/pdf-preview';
import { AppStepper } from "../../../../shared/components/app-stepper/app-stepper";
import { DocumentService } from '../../services/document.service';
import { DynamicForm } from "../../../../shared/components/dynamic-form/dynamic-form";
import { Card } from "primeng/card";

@Component({
  selector: 'app-sing-entry',
  standalone: true,
  imports: [
    CommonModule,
    StepsModule,
    ButtonModule,
    PdfPreview,
    AppStepper,
    DynamicForm
  ],
  templateUrl: './sing-entry.html',
  styleUrl: './sing-entry.css',
})
export class SingEntry implements OnInit {

  private documentService = inject(DocumentService);

  steps: MenuItem[] = [
    { label: 'Datos', icon: 'pi pi-user' },
    { label: 'Documento', icon: 'pi pi-file' },
    { label: 'Confirmar', icon: 'pi pi-check' }
  ];


  formJson = [
    {
      name: 'Formulario de prueba',
      role: 'acquirer',
      pages: [
        [
          {
            id: 1,
            name: 'Entidad Financiera *',
            type: 'Select',
            items: ['Banco Pichincha', 'Banco Guayaquil', 'Produbanco'],
            var_answer: 'entity_financial'
          },
          {
            id: 2,
            name: 'Nombre del Titular *',
            type: 'Text',
            items: [],
            var_answer: 'account_holder'
          },
          {
            id: 3,
            name: 'Tipo de Cuenta *',
            type: 'Radio',
            items: ['Cuenta Corriente', 'Cuenta de Ahorros'],
            var_answer: 'account_type'
          },
          {
            id: 4,
            name: 'Número de Cuenta *',
            type: 'Text',
            items: [],
            var_answer: 'account_number'
          }
        ]
      ]
    }
  ];

  pdfUrl = 'https://doc.firmasegura.work:8280/ipfs/QmT7zQdnKphd8hBPXsKaRGyoM7qZXB7Rg7TyBqSmWQSRLs';

  pdfSrc!: string;

  activeStep = 0;

  accountOk = false;
  profileOk = false;

  ngOnInit() {
    this.documentService.loadPdf(this.pdfUrl).subscribe({
      next: (blob) => {
        const fileURL = URL.createObjectURL(blob);
        console.log('🟢 PDF listo:', fileURL);
        this.pdfSrc = fileURL;
      },
      error: err => console.error('❌ Error PDF', err)
    });
  }


  goToStep(step: number) {
    // Siempre permitir retroceder
    if (step < this.activeStep) {
      this.activeStep = step;
      return;
    }

    // Validar solo al avanzar
    if (!this.canAdvance()) return;

    this.activeStep = step;
  }


 canAdvance(): boolean {
  return true;
}


  get pageFields() {
    return this.formJson[0].pages[0];
  }

}

