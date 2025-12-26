import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  DocumentAnalyzeResponse,
  DocumentCheckRow,
  DocumentRuleCode
} from '../../models/analyze.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-analyze-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    TableModule,
    TagModule,
    ButtonModule,
    MessageModule,
    DividerModule,
    ProgressBarModule
  ],
  templateUrl: './analyze-dialog.html',
  styleUrl: './analyze-dialog.css',
})
export class AnalyzeDialog implements OnInit {

  response!: DocumentAnalyzeResponse;
  rows: DocumentCheckRow[] = [];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    console.log('📥 DATA RECIBIDA EN DIALOG:', this.config.data);

    if (!this.config.data) {
      console.warn('⚠️ No llegó data al diálogo');
      return;
    }

    this.response = this.config.data as DocumentAnalyzeResponse;
    this.rows = this.response.results ?? [];

    console.log('📊 Filas cargadas:', this.rows);
  }

  close(): void {
    this.ref.close();
  }

  getSeverity(
    result: 'PASS' | 'FAIL' | 'WARNING'
  ): 'success' | 'danger' | 'warn' {
    switch (result) {
      case 'PASS': return 'success';
      case 'FAIL': return 'danger';
      case 'WARNING': return 'warn';
    }
  }

  getGlobalStatus(): 'success' | 'error' | 'warn' {
    if (this.rows.some(r => r.result === 'FAIL')) return 'error';
    if (this.rows.some(r => r.result === 'WARNING')) return 'warn';
    return 'success';
  }

  getGlobalMessage(): string {
    if (this.rows.some(r => r.result === 'FAIL')) {
      return 'El documento NO cumple todas las reglas de validación';
    }
    if (this.rows.some(r => r.result === 'WARNING')) {
      return 'El documento cumple parcialmente las reglas';
    }
    return 'El documento cumple todas las reglas de validación';
  }

  getRuleLabel(code: DocumentRuleCode): string {
    const map: Record<DocumentRuleCode, string> = {
      R001: 'Firma presente',
      R002: 'Fecha válida',
      R003: 'Nombre del firmante',
      R004: 'Documento completo',
      R005: 'Archivo legible'
    };
    return map[code];
  }
}
