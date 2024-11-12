import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jornada } from '../models/jornada.model';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {
  private apiUrl = 'https://ssvsbackend-production.up.railway.app/api/jornadas';

  constructor(private http: HttpClient) {}

  getAllJornadas(): Observable<Jornada[]> {
    return this.http.get<Jornada[]>(this.apiUrl);
  }
}
