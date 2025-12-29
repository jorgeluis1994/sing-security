import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  DocumentAnalyzeResponse,
  AnalyzeResultRow,
  AnalyzeRuleCode,
  AnalyzeResultStatus
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
  rows: AnalyzeResultRow[] = [];

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
    this.rows = this.response.result.data;

    console.log('📊 Filas cargadas:', this.rows);
  }

  close(): void {
    this.ref.close();
  }

  getSeverity(
    result: AnalyzeResultStatus
  ): 'success' | 'danger' | 'warn' {
    switch (result) {
      case 'SUCCESS': return 'success';
      case 'FAILED': return 'danger';
      case 'WARNING': return 'warn';
    }
  }

  getGlobalStatus(): 'success' | 'error' | 'warn' {
    if (this.rows.some(r => r.result === 'FAILED')) return 'error';
    if (this.rows.some(r => r.result === 'WARNING')) return 'warn';
    return 'success';
  }

  getGlobalMessage(): string {
    if (this.rows.some(r => r.result === 'FAILED')) {
      return 'El documento NO cumple todas las validaciones';
    }
    if (this.rows.some(r => r.result === 'WARNING')) {
      return 'El documento cumple parcialmente las validaciones';
    }
    return 'El documento cumple todas las validaciones';
  }

  getRuleLabel(code: AnalyzeRuleCode): string {
    const map: Partial<Record<AnalyzeRuleCode, string>> = {
      C001: 'Cédula válida',
      R001: 'RUC válido'
    };
    return map[code] ?? code;
  }
}
