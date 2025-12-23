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
