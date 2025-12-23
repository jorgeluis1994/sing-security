export interface SignDocumentPayload {
  pdf: {
    name: string;
    dataUrl: string;
  };

  certificate: {
    file: File;
    password: string;
  };

  positions: {
    page: number;
    x: number;
    y: number;
  }[];
}

// models/sign-graphological.model.ts
export interface SignGraphologicalPayload {
  pdf: {
    name: string;
    dataUrl: string;
  };

  fullName: string;

  position: SignaturePosition;
}

export interface SignaturePosition {
  page: number;   // página (base 0)
  x: number;      // coordenada X
  y: number;      // coordenada Y
  width?: number; // opcional
  height?: number;
}



