// src/app/services/cupo.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cupo } from '../models/cupo.model';

@Injectable({
  providedIn: 'root'
})
export class CupoService {
  private apiUrl = 'https://ssvsbackend-production.up.railway.app/api/cupos';

  constructor(private http: HttpClient) {}

  getCupos(): Observable<Cupo[]> {
    return this.http.get<Cupo[]>(this.apiUrl);
  }

  getCupoById(id: number): Observable<Cupo> {
    return this.http.get<Cupo>(`${this.apiUrl}/${id}`);
  }

  getCuposWithDetails(medicoId: number, especialidadId: number): Observable<Cupo[]> {
    const url = `${this.apiUrl}/medico/${medicoId}/especialidad/${especialidadId}`;
    return this.http.get<Cupo[]>(url);
  }
  getCuposDisponibles(medicoId: number, especialidadId: number): Observable<Cupo[]> {
    return this.http.get<Cupo[]>(`${this.apiUrl}/disponibles?medicoId=${medicoId}&especialidadId=${especialidadId}`);
}
  
}
