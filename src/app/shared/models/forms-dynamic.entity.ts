export interface DynamicField {
  id: number;
  name: string;
  type: 'Text' | 'Select' | 'Radio';
  class: string;
  items: any[];
  style: string;
  weight: number[];
  attributes: any[];
  var_answer: string;
  description: string;
}

export interface DynamicFormConfig {
  name: string;
  role: string;
  pages: DynamicField[][];
  description: string;
}
