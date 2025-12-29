import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { DataViewModule } from 'primeng/dataview';
import { DialogService } from 'primeng/dynamicdialog';

import { PdfPreview, SignatureMark } from '../pdf-preview/pdf-preview';
import { SessionDocument } from '../../../features/signing/services/document.service';
import { SigningFacade } from '../../../features/signing/facades/signing.facade';
import { AnalyzeDialog } from '../../../features/signing/dialogs/analyze-dialog/analyze-dialog';

@Component({
  selector: 'app-pdf-preview-list',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TagModule,
    TooltipModule,
    DataViewModule,
    PdfPreview
  ],
  templateUrl: './pdf-preview-list.html',
  styleUrl: './pdf-preview-list.css',
})
export class PdfPreviewList implements OnInit {

  readonly facade = inject(SigningFacade);
  private readonly dialogService = inject(DialogService);

  @Input({ required: true }) documents!: SessionDocument[];
  @Output() signaturePosition = new EventEmitter<SignatureMark>();

  selectedDoc!: SessionDocument;

  ngOnInit(): void {
    if (this.documents?.length) {
      this.selectedDoc = this.documents[0];
    }
  }

  onSignatureCaptured(mark: SignatureMark): void {
    this.signaturePosition.emit(mark);
  }

  openAnalyzeDialog(doc: SessionDocument): void {
    const result = this.facade.getAnalysis(doc);
    if (!result) return;

    this.dialogService.open(AnalyzeDialog, {
      header: 'Análisis del documento',
      width: '70vw',
      height: '80vh',
      modal: true,
      closable: true,   // 👈 ESTO
      draggable: false,
      resizable: false,
      data: result,
      breakpoints: {
        '960px': '90vw',
        '640px': '100vw'
      }
    });

  }
}
