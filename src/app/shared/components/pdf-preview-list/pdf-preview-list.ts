import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ListboxModule } from 'primeng/listbox';

import { PdfPreview } from '../../../features/signing/components/pdf-preview/pdf-preview';
import { SessionDocument } from '../../../features/signing/services/document.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pdf-preview-list',
  standalone: true,
  imports: [
    CommonModule,
    ListboxModule,
    FormsModule,
    CardModule,
    PdfPreview
  ],
  templateUrl: './pdf-preview-list.html',
  styleUrl: './pdf-preview-list.css',
})
export class PdfPreviewList implements OnInit {
  @Input({ required: true }) documents!: SessionDocument[];

  selectedDoc!: SessionDocument;

  ngOnInit(): void {
    // Seleccionar el primero por defecto
    if (this.documents?.length) {
      this.selectedDoc = this.documents[0];
    }
  }


}
