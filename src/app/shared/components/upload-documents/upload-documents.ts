import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DocumentService } from '../../../features/signing/services/document.service';

@Component({
  selector: 'app-upload-documents',
  imports: [
    CommonModule,
    FileUploadModule,
    CardModule,
    ButtonModule,
    TagModule
  ],
  templateUrl: './upload-documents.html',
  styleUrl: './upload-documents.css',
})
export class UploadDocuments {

  documents: File[] = [];

  constructor(private documentService: DocumentService) {}

  async onSelect(event: any) {
    const files: File[] = event.files;

    for (const file of files) {
      if (file.type !== 'application/pdf') {
        console.warn('❌ No es PDF:', file.name);
        continue;
      }
      this.documents.push(file);
    }

    // 💾 Guardar en sesión
    await this.documentService.saveToSession(this.documents);
  }

  removeFile(index: number) {
    this.documents.splice(index, 1);

    // 🔄 Actualizar sesión
    this.documentService.saveToSession(this.documents);
  }

  canContinue(): boolean {
    return this.documents.length > 0;
  }
}
