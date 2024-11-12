export interface ConsultaMedica {
    consultaId?: number;
    reservaId: number | null;
    historiaId: number | null;
    fechaConsulta: Date;
    diagnostico: string;
    tratamiento: string;
    notas: string;
    nombrePaciente?: string;
    apellidoPaciente?: string;
    nombreMedico?: string;
    apellidoMedico?: string;
  }
  