import { DynamicFormConfig } from "../../../shared/models/forms-dynamic.entity";

export const SIGNING_FORM_CONFIG: DynamicFormConfig[] = [
  {
    name: 'Completar la siguiente información requerida',
    role: 'acquirer',
    pages: [
      [
        {
          id: 1,
          name: 'Número de Identificación (Cédula o RUC) *',
          type: 'Text',
          class: 'col-12',
          items: [],
          style: '',
          weight: [],
          attributes: [],
          var_answer: 'var_identification_number',
          description: '',
        },
              {
          id: 1,
          name: 'Número de Identificación (Cédula o RUC) *',
          type: 'Text',
          class: 'col-12',
          items: [],
          style: '',
          weight: [],
          attributes: [],
          var_answer: 'var_identification_number',
          description: '',
        },
              {
          id: 1,
          name: 'Número de Identificación (Cédula o RUC) *',
          type: 'Text',
          class: 'col-12',
          items: [],
          style: '',
          weight: [],
          attributes: [],
          var_answer: 'var_identification_number',
          description: '',
        }
      ],
    ],
    description: '',
  },
];


export const SIGNING_STEPS = [
    { label: 'Información', icon: 'pi pi-briefcase' },
    { label: 'Subir documentos', icon: 'pi pi-folder-open' },
    { label: 'Visualizar documentos', icon: 'pi pi-file-pdf' },
];


