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
        },
        {
          id: 3,
          name: 'Correo electrónico *',
          type: 'Text',
          class: 'col-12 md:col-6',
          items: [],
          style: '',
          weight: [],
          attributes: [],
          var_answer: 'email',
          description: 'Proporcione un correo electrónico válido. A este correo se enviarán notificaciones relacionadas con el proceso de firma.',
        },
        {
          id: 4,
          name: 'Teléfono de contacto',
          type: 'Text',
          class: 'col-12 md:col-6',
          items: [],
          style: '',
          weight: [],
          attributes: [],
          var_answer: 'phone',
          description: 'Ingrese un número de contacto opcional en caso de requerir validaciones o notificaciones adicionales.',
        },
        {
          id: 5,
          name: 'Tipo de documento *',
          type: 'Select',
          class: 'col-12 md:col-6',
          items: [
            { label: 'Contrato', value: 'contract' },
            { label: 'Acuerdo', value: 'agreement' },
            { label: 'Poder', value: 'power' },
          ],
          style: '',
          weight: [],
          attributes: [],
          var_answer: 'document_type',
          description: 'Seleccione el tipo de documento que será firmado para aplicar las validaciones correspondientes.',
        },
        {
          id: 6,
          name: 'País de residencia *',
          type: 'Select',
          class: 'col-12 md:col-6',
          items: [
            { label: 'Ecuador', value: 'EC' },
            { label: 'Colombia', value: 'CO' },
            { label: 'Perú', value: 'PE' },
          ],
          style: '',
          weight: [],
          attributes: [],
          var_answer: 'country',
          description: 'Indique su país de residencia. Esta información puede ser requerida para validaciones legales y normativas.',
        },
        {
          id: 7,
          name: '¿Acepta los términos y condiciones? *',
          type: 'Radio',
          class: 'col-12',
          items: ['Sí', 'No'],
          style: '',
          weight: [],
          attributes: [],
          var_answer: 'accept_terms',
          description: 'Confirme que ha leído y acepta los términos y condiciones necesarios para continuar con la firma del documento.',
        },
        
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



