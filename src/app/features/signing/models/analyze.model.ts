// export enum DocumentRuleCode {
//   R001 = 'R001', // Firma presente
//   R002 = 'R002', // Fecha válida
//   R003 = 'R003', // Nombre del firmante
//   R004 = 'R004', // Documento completo
//   R005 = 'R005'  // Archivo legible
// }

// export interface DocumentAnalyzeResponse {
//   success: boolean;
//   result: DocumentCheckRow[];
// }

// export interface DocumentCheckRow {
//   rule: DocumentRuleCode; // Código de la regla
//   expected: string;          // Qué debería cumplir
//   detected: string;          // Qué encontró la IA
//   result: 'PASS' | 'FAIL' | 'WARNING';
//   confidence: number;        // 0–100
//   observation: string;      // Mensaje claro para usuario
// }

export type AnalyzeResultStatus = 'SUCCESS' | 'FAILED' | 'WARNING';

export enum AnalyzeRuleCode {
  C001 = 'C001', // Cédula válida
  R001 = 'R001'  // RUC válido
}
export interface AnalyzeResultRow {
  rule: AnalyzeRuleCode;
  expected: string;
  detected: string;
  observation: string;
  result: AnalyzeResultStatus;
  confidence: number;
}
export interface AnalyzeResultPayload {
  data: AnalyzeResultRow[];
  total_cedulas: number;
  total_rucs: number;
}
export interface DocumentAnalyzeResponse {
  success: boolean;
  result: AnalyzeResultPayload;
}



