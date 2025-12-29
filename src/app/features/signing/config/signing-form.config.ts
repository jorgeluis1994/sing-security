import { DynamicFormConfig } from "../../../shared/models/forms-dynamic.entity";

export const SIGNING_FORM_CONFIG: DynamicFormConfig[] = [
  {
    name: 'Información requerida',
    role: 'acquirer',
    description: 'Complete los siguientes datos para verificar su identidad y continuar con el proceso de firma del documento.',
    pages: [
      [
        {
          id: 1,
          name: 'Número de Identificación (Cédula o RUC) *',
          type: 'Text',
          class: 'col-12 md:col-6',
          items: [],
          style: '',
          weight: [],
          attributes: [],
          var_answer: 'identification_number',
          description: 'Ingrese su número de identificación válido. Este dato se utiliza para la verificación legal del firmante.',
        },
        {
          id: 2,
          name: 'Nombres completos *',
          type: 'Text',
          class: 'col-12 md:col-6',
          items: [],
          style: '',
          weight: [],
          attributes: [],
          var_answer: 'full_name',
          description: 'Ingrese sus nombres y apellidos completos tal como constan en su documento de identidad.',
        }
        
      ]
    ]
  }
];



export const SIGNING_STEPS = [
  {
    label: 'Datos del solicitante',
    icon: 'pi pi-user'
  },
  {
    label: 'Carga de documentos',
    icon: 'pi pi-upload'
  },
  {
    label: 'Revisión del documento',
    icon: 'pi pi-eye'
  },
  {
    label: 'Registro y confirmación',
    icon: 'pi pi-check-circle'
  }
];



