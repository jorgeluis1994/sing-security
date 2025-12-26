import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ListboxModule } from 'primeng/listbox';

import { PdfPreview, SignatureMark } from '../pdf-preview/pdf-preview';
import { SessionDocument } from '../../../features/signing/services/document.service';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { DrawerModule } from 'primeng/drawer';
import { DocumentAnalyzeResponse, DocumentCheckRow, DocumentRuleCode } from '../../../features/signing/models/analyze.model';
import { DialogService } from 'primeng/dynamicdialog';
import { AnalyzeDialog } from '../../../features/signing/dialogs/analyze-dialog/analyze-dialog';



@Component({
  selector: 'app-pdf-preview-list',
  standalone: true,
  imports: [
    CommonModule,
    ListboxModule,
    FormsModule,
    CardModule,
    PdfPreview,
    TableModule,
    TagModule,
    ButtonModule,
    TooltipModule,
    DrawerModule
  ],
  templateUrl: './pdf-preview-list.html',
  styleUrl: './pdf-preview-list.css',
})
export class PdfPreviewList implements OnInit {

  private dialogService = inject(DialogService);
  @Input({ required: true }) documents!: SessionDocument[];
  @Output() signaturePosition = new EventEmitter<SignatureMark>();


  selectedDoc!: SessionDocument;

  ngOnInit(): void {
    // Seleccionar el primero por defecto
    if (this.documents?.length) {
      this.selectedDoc = this.documents[0];
    }
  }
  onSignatureCaptured(mark: SignatureMark) {
    console.log('📤 Firma recibida en PdfPreviewList:', mark);

    // reenviar al padre
    this.signaturePosition.emit(mark);
  }

  openAnalyzeDialog(doc: SessionDocument): void {
    debugger

    const mockResponse: DocumentAnalyzeResponse = {
      success: true,
      results: [
        {
          ruleCode: DocumentRuleCode.R001,
          expected: 'El documento debe contener una firma',
          detected: 'Firma manuscrita detectada',
          result: 'PASS',
          confidence: 98,
          observation: 'La firma se encuentra visible en la última página'
        },
        {
          ruleCode: DocumentRuleCode.R002,
          expected: 'Debe existir una fecha válida',
          detected: 'Fecha no encontrada',
          result: 'FAIL',
          confidence: 65,
          observation: 'No se detectó una fecha en el documento'
        },
        {
          ruleCode: DocumentRuleCode.R003,
          expected: 'Debe constar el nombre del firmante',
          detected: 'Nombre parcial detectado',
          result: 'WARNING',
          confidence: 72,
          observation: 'El nombre no coincide completamente con el esperado'
        }
      ]
    };

    this.dialogService.open(AnalyzeDialog, {
      header: 'Análisis del documento',
      width: '70vw',
      height: '80vh',
      modal: true,
      closable: true,
      draggable: false,
      resizable: false,
      breakpoints: {
        '960px': '90vw',
        '640px': '100vw'
      },
      data:mockResponse
    });




  }

  





}
