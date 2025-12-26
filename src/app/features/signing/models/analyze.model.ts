export enum DocumentRuleCode {
  R001 = 'R001', // Firma presente
  R002 = 'R002', // Fecha válida
  R003 = 'R003', // Nombre del firmante
  R004 = 'R004', // Documento completo
  R005 = 'R005'  // Archivo legible
}

export interface DocumentAnalyzeResponse {
  success: boolean;
  results: DocumentCheckRow[];
}

export interface DocumentCheckRow {
  ruleCode: DocumentRuleCode; // Código de la regla
  expected: string;          // Qué debería cumplir
  detected: string;          // Qué encontró la IA
  result: 'PASS' | 'FAIL' | 'WARNING';
  confidence: number;        // 0–100
  observation: string;      // Mensaje claro para usuario
}

