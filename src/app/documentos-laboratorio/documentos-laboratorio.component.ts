import { Component, OnInit } from '@angular/core';
import { DocumentosLaboratorio } from '../models/documentos-laboratorio.model';
import { DocumentosLaboratorioService } from '../services/documentos-laboratorio.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-documentos-laboratorio',
  templateUrl: './documentos-laboratorio.component.html',
  styleUrls: ['./documentos-laboratorio.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DocumentosLaboratorioComponent implements OnInit {
  laboratorios: any[] = [];
  selectedLaboratorioId: number | null = null;
  fechaHoy = new Date();

  newDocumento: DocumentosLaboratorio = {
    laboratorioId: 0,
    nombreArchivo: '',
    tipoDocumento: '',
    ubicacionArchivo: '',
    fechaRealizacion: this.fechaHoy
  };

  constructor(private documentosService: DocumentosLaboratorioService) {}

  ngOnInit(): void {
    this.loadLaboratorios();
  }

  loadLaboratorios(): void {
    this.documentosService.getLaboratorios().subscribe((data) => {
      this.laboratorios = data;
    });
  }

  createDocumento(fileInputEvent: any): void {
    if (this.selectedLaboratorioId && fileInputEvent.target.files.length > 0) {
      const file = fileInputEvent.target.files[0];
      this.newDocumento.laboratorioId = this.selectedLaboratorioId;
      this.newDocumento.nombreArchivo = file.name;
      this.newDocumento.tipoDocumento = file.type;
      this.newDocumento.fechaRealizacion = this.fechaHoy;

      // Aquí se debería subir el archivo y guardar la URL en ubicacionArchivo
      // Suponiendo que la URL está directamente disponible después de la subida:
      this.newDocumento.ubicacionArchivo = 'URL_DEL_ARCHIVO_SUBIDO';

      this.documentosService.createDocumento(this.newDocumento).subscribe(() => {
        // Resetear formulario o mostrar mensaje de éxito
      });
    }
  }
}