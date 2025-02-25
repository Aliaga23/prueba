import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PacienteConsulta } from '../models/paciente-consulta.model';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private apiUrl = 'https://ssvsbackend-production.up.railway.app/api/reportes';

  constructor(private http: HttpClient) {}

  obtenerReporteConsultas(): Observable<PacienteConsulta[]> {
    return this.http.get<PacienteConsulta[]>(`${this.apiUrl}/consultas`);
  }
}
