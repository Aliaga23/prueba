// src/app/services/historia-clinica.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HistoriaClinicaResumen {
  pacienteId: number;
  nombrePaciente: string;
  apellidoPaciente: string;
  historiaId: number;
  fechaCreacionHistoria: string;
  consultaId: number;
  fechaConsulta: string;
  diagnostico: string;
  tratamiento: string;
  notasConsulta: string;
  medicamentosReceta: string;
  laboratorios: string;
}

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {
  private apiUrl = 'https://ssvsbackend-production.up.railway.app/api/historias-clinicas/resumen';

  constructor(private http: HttpClient) {}

  getHistoriaClinicaResumen(pacienteId: number): Observable<HistoriaClinicaResumen[]> {
    return this.http.get<HistoriaClinicaResumen[]>(`${this.apiUrl}/${pacienteId}`);
  }
}
