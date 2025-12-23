import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ListboxModule } from 'primeng/listbox';

import { PdfPreview, SignatureMark } from '../pdf-preview/pdf-preview';
import { SessionDocument } from '../../../features/signing/services/document.service';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';



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
    TooltipModule
  ],
  templateUrl: './pdf-preview-list.html',
  styleUrl: './pdf-preview-list.css',
})
export class PdfPreviewList implements OnInit {
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



}
