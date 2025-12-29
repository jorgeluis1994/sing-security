import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject, OnInit } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import {
  DocumentIpfsFacade,
  IpfsDocument
} from '../../../features/signing/facades/document-ipfs.facade';

@Component({
  selector: 'app-upload-documents',
  standalone: true,
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
export class UploadDocuments implements OnInit {

  @Output() validChange = new EventEmitter<boolean>();

  private readonly facade = inject(DocumentIpfsFacade);

  // 👇 ESTADO QUE USA EL HTML
  documents: IpfsDocument[] = [];

  ngOnInit(): void {
    // 🔁 sincroniza UI con el facade
    this.facade.documents$.subscribe(docs => {
      this.documents = docs;
      this.validChange.emit(docs.length > 0);
    });
  }

  async onUpload(event: any): Promise<void> {
    const files: File[] = event.files ?? [];

    const docs: IpfsDocument[] = [];

    for (const file of files) {
      if (file.type !== 'application/pdf') continue;

      const dataUrl = await this.fileToDataUrl(file);

      docs.push({
        name: file.name,
        size: file.size,
        type: file.type,
        file,
        blobUrl: URL.createObjectURL(file),
        dataUrl,
        uploaded: false,
      });
    }

    if (!docs.length) return;

    this.facade.addDocuments(docs);
  }

  // 👇 ESTE ES EL QUE FALTABA
  removeFile(index: number): void {
    const updated = [...this.documents];
    updated.splice(index, 1);

    this.facade.setDocuments(updated);
    this.validChange.emit(updated.length > 0);
  }

  // =====================
  // 🔧 UTIL
  // =====================
  private fileToDataUrl(file: File): Promise<string> {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }
}
