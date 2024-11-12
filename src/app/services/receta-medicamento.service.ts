import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecetaMedicamento } from '../models/receta-medicamento.model';

@Injectable({
  providedIn: 'root'
})
export class RecetaMedicamentoService {
  private baseUrl = 'https://ssvsbackend-production.up.railway.app/api/recetas-medicamentos';

  constructor(private http: HttpClient) {}

  // Obtener todos los medicamentos de una receta específica
  getMedicamentosByRecetaId(recetaId: number): Observable<RecetaMedicamento[]> {
    return this.http.get<RecetaMedicamento[]>(`${this.baseUrl}/receta/${recetaId}`);
  }

  // Añadir un medicamento a una receta
  addMedicamentoToReceta(recetaMedicamento: RecetaMedicamento): Observable<RecetaMedicamento> {
    return this.http.post<RecetaMedicamento>(this.baseUrl, recetaMedicamento);
  }

  // Eliminar un medicamento de una receta
  removeMedicamentoFromReceta(recetaId: number, medicamentoId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}?recetaId=${recetaId}&medicamentoId=${medicamentoId}`);
  }
}
