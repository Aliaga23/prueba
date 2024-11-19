import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bitacora } from '../models/bitacora.model';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {
  private apiUrl = 'https://ssvsbackend-production.up.railway.app/api/bitacora';

  constructor(private http: HttpClient) {}

  getBitacoras(): Observable<Bitacora[]> {
    return this.http.get<Bitacora[]>(`${this.apiUrl}/historial`);
  }
}
