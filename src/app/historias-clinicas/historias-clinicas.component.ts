import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Paciente {
  pacienteId: number;
  nombre: string;
  apellido: string;
}

interface HistoriaClinicaEntry {
  fecha: Date;
  tipo: string;
  detalles: string;
  observaciones: string;
}

@Component({
  selector: 'app-historias-clinicas',
  templateUrl: './historias-clinicas.component.html',
  styleUrls: ['./historias-clinicas.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class HistoriasClinicasComponent implements OnInit {
  pacientes: Paciente[] = [];
  historiaClinica: HistoriaClinicaEntry[] = [];
  selectedPacienteId: number | null = null;
  showModal: boolean = false;
  selectedEntry: HistoriaClinicaEntry | null = null;

  ngOnInit(): void {
    this.loadMockData();
  }

  loadMockData() {
    // Simulated patient data
    this.pacientes = [
      { pacienteId: 1, nombre: 'Juan', apellido: 'Pérez' },
      { pacienteId: 2, nombre: 'María', apellido: 'López' }
    ];

    // Simulated clinical history data
    this.historiaClinica = [
      {
        fecha: new Date(),
        tipo: 'Consulta Médica',
        detalles: 'Revisión general',
        observaciones: 'El paciente presenta síntomas leves de gripe'
      },
      {
        fecha: new Date(),
        tipo: 'Examen de Sangre',
        detalles: 'Hemograma completo',
        observaciones: 'Resultados normales'
      },
      {
        fecha: new Date(),
        tipo: 'Consulta Médica',
        detalles: 'Chequeo post-operativo',
        observaciones: 'Cicatrización adecuada sin complicaciones'
      },
      {
        fecha: new Date(),
        tipo: 'Radiografía',
        detalles: 'Radiografía de tórax',
        observaciones: 'No se observan anomalías'
      }
    ];
  }

  viewHistoriaClinica() {
    if (this.selectedPacienteId) {
      console.log(`Loading history for patient ID: ${this.selectedPacienteId}`);
      // Filter or load specific history data based on selectedPacienteId if needed
    }
  }

  viewDetalles(entry: HistoriaClinicaEntry) {
    this.selectedEntry = entry;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedEntry = null;
  }
}
