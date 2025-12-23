import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';

import { AppStepper } from '../../../../shared/components/app-stepper/app-stepper';
import { UploadDocuments } from '../../../../shared/components/upload-documents/upload-documents';
import { PdfPreviewList } from '../../../../shared/components/pdf-preview-list/pdf-preview-list';
import { DynamicForm } from '../../../../shared/components/dynamic-form/dynamic-form';
import { ValidatePdf } from '../../../../shared/components/validate-pdf/validate-pdf';
import { SingPdf } from '../../../../shared/components/sing-pdf/sing-pdf';

import { DocumentService } from '../../services/document.service';
import { SigningFacade } from '../../facades/signing.facade';

import { SignatureMark } from '../../../../shared/components/pdf-preview-list/pdf-preview/pdf-preview';
import {
  SIGNING_FORM_CONFIG,
  SIGNING_STEPS
} from '../../config/signing-form.config';

@Component({
  selector: 'app-sing-entry',
  standalone: true,
  imports: [
    CommonModule,
    StepsModule,
    ButtonModule,
    CardModule,
    ToolbarModule,

    AppStepper,
    UploadDocuments,
    PdfPreviewList,
    DynamicForm,
    ValidatePdf,
    SingPdf,
  ],
  templateUrl: './sing-entry.html',
  styleUrl: './sing-entry.css',
})
export class SingEntry implements OnInit {

  // ================= DEPENDENCIES =================
  private readonly facade = inject(SigningFacade);
  private readonly documentService = inject(DocumentService);

  // ================= UI DATA =================
  steps = SIGNING_STEPS;
  currentForm = SIGNING_FORM_CONFIG[0];

  // ================= STATE (FROM FACADE) =================
  activeStep$ = this.facade.activeStep$;
  documents$ = this.facade.documents$;

  // ================= LIFECYCLE =================
  ngOnInit(): void {
    this.documentService.docs$.subscribe(docs => {
      this.facade.setDocuments(docs);
    });
  }

  // ================= STEPPER =================
  goToStep(step: number): void {
    this.facade.goToStep(step);
  }

  canAdvance(): boolean {
    return this.facade.canAdvance();
  }

  // ================= EVENTS FROM CHILDREN =================
  onSignatureCaptured(mark: SignatureMark): void {
    this.facade.addSignature(mark);
  }

  onHtmlChange(html: string): void {
    this.facade.setHtml(html);
  }

  // ================= ACTION =================
  signDocument(): void {
    this.facade.sign().subscribe({
      next: res => {
        console.log('✅ Documento firmado', res);
        // aquí luego puedes:
        // - descargar PDF
        // - mostrar toast
        // - avanzar a paso final
      },
      error: err => {
        console.error('❌ Error firmando', err);
      },
    });
  }

}
