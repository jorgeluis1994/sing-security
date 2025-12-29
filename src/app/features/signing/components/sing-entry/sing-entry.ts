import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';

import { AppStepper } from '../../../../shared/components/app-stepper/app-stepper';
import { UploadDocuments } from '../../../../shared/components/upload-documents/upload-documents';
import { PdfPreviewList } from '../../../../shared/components/pdf-preview-list/pdf-preview-list';
import { DynamicForm } from '../../../../shared/components/dynamic-form/dynamic-form';
import { SingPdf } from '../../../../shared/components/sing-pdf/sing-pdf';

import { DocumentIpfsFacade } from '../../facades/document-ipfs.facade';
import { StepFacade } from '../../facades/step.facade';

import {
  SIGNING_FORM_CONFIG,
  SIGNING_STEPS
} from '../../config/signing-form.config';
import { Subject, takeUntil } from 'rxjs';

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
    SingPdf
  ],
  templateUrl: './sing-entry.html',
  styleUrl: './sing-entry.css',
})
export class SingEntry {

  private readonly destroy$ = new Subject<void>();

  private readonly stepFacade = inject(StepFacade);
  private readonly ipfsFacade = inject(DocumentIpfsFacade);

  steps = SIGNING_STEPS;
  currentForm = SIGNING_FORM_CONFIG[0];

  activeStep$ = this.stepFacade.activeStep$;
  documents$ = this.ipfsFacade.documents$;

  isFormValid = false;
  documentsValid = false;

  ngOnInit(): void {
    this.stepFacade.activeStep$
      .pipe(takeUntil(this.destroy$))
      .subscribe(step => {
        console.log('[ENTRY] step =', step);

        if (step === 2) {
          console.log('[ENTRY] trigger IPFS');
          this.ipfsFacade.uploadAll();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFormValid(valid: boolean) {
    this.isFormValid = valid;
  }

  onDocumentsValid(valid: boolean) {
    this.documentsValid = valid;
  }

  goToStep(step: number): void {
    if (!this.canAdvance()) return;
    this.stepFacade.goTo(step);
  }

  canAdvance(): boolean {
    const step = this.stepFacade.currentStep;

    if (step === 0) return this.isFormValid;
    if (step === 1) return this.documentsValid;
    if (step === 2) return !this.ipfsFacade.isUploading();
    return true;
  }
}

