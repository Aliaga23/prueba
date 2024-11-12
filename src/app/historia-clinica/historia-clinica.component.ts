import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistoriaClinicaService, HistoriaClinicaResumen } from '../services/historia-clinica.service';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class HistoriaClinicaComponent implements OnInit {
  historiaClinica: HistoriaClinicaResumen[] = [];
  pacienteId: number = 1;  // Cambia este valor según el paciente que deseas consultar

  constructor(private historiaClinicaService: HistoriaClinicaService) {}

  ngOnInit(): void {
    this.loadHistoriaClinica();
  }

  loadHistoriaClinica(): void {
    this.historiaClinicaService.getHistoriaClinicaResumen(this.pacienteId).subscribe(
      (data) => {
        this.historiaClinica = data;
      },
      (error) => {
        console.error('Error al cargar la historia clínica', error);
      }
    );
  }
}