// src/app/permiso-postergacion/permiso-postergacion.component.ts
import { Component, OnInit } from '@angular/core';
import { PermisoPostergacion } from '../models/permiso-postergacion.model';
import { PermisoPostergacionService } from '../services/permiso-postergacion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-permiso-postergacion',
    templateUrl: './permiso-postergacion.component.html',
    standalone: true,
    imports: [CommonModule, FormsModule],
    styleUrls: ['./permiso-postergacion.component.css']
})
export class PermisoPostergacionComponent implements OnInit {
    permisos: PermisoPostergacion[] = [];
    permiso: PermisoPostergacion = {
        medicoId: 0,
        tipoPostergacion: 'Por Hora',
        fechaInicio: new Date(),
        estado: 'Pendiente',
        motivo: ''
    };
    isEditing: boolean = false;
    estadosDisponibles = ['Pendiente', 'Aprobada', 'Rechazada'];
    mostrarHoras: boolean = true; // Para controlar la visualización de campos de hora

    constructor(private permisoService: PermisoPostergacionService) {}

    ngOnInit(): void {
        this.loadPermisos();
        this.onTipoPostergacionChange(); // Inicializa `mostrarHoras` correctamente
    }

    loadPermisos() {
        this.permisoService.getAllPermisos().subscribe((data) => {
            this.permisos = data;
            console.log('Permisos de postergación cargados:', this.permisos);
        });
    }

    createPermiso() {
        const permisoData = this.preparePermisoData();
        this.permisoService.createPermiso(permisoData).subscribe(response => {
            console.log(response.message);
            this.loadPermisos();
            this.clearForm();
        });
    }

    preparePermisoData() {
        const permisoData = { ...this.permiso };
        permisoData.fechaInicio = this.formatDate(this.permiso.fechaInicio);
        permisoData.horaInicio = this.permiso.horaInicio ? this.formatTime(this.permiso.horaInicio) : null;
        permisoData.horaFin = this.permiso.horaFin ? this.formatTime(this.permiso.horaFin) : null;
        console.log('Datos preparados para enviar:', permisoData);
        return permisoData;
    }

    editPermiso(permiso: PermisoPostergacion) {
        this.permiso = { ...permiso };
        this.isEditing = true;
        this.onTipoPostergacionChange(); // Actualiza `mostrarHoras` basado en el tipo
        console.log('Editando permiso:', this.permiso);
    }

    updatePermiso() {
        if (this.permiso.postergacionId) {
            const permisoData = this.preparePermisoData();
            console.log('Actualizando permiso con ID:', this.permiso.postergacionId, 'Datos:', permisoData);
            this.permisoService.updatePermiso(this.permiso.postergacionId, permisoData).subscribe(() => {
                alert('Permiso de postergación actualizado.');
                this.loadPermisos();
                this.clearForm();
            });
        }
    }

    deletePermiso(id: number) {
        if (confirm('¿Estás seguro de eliminar este permiso de postergación?')) {
            console.log('Eliminando permiso con ID:', id);
            this.permisoService.deletePermiso(id).subscribe(() => {
                alert('Permiso de postergación eliminado.');
                this.loadPermisos();
            });
        }
    }

    changeEstado(permiso: PermisoPostergacion, nuevoEstado: string) {
        permiso.estado = nuevoEstado;
        console.log('Cambiando estado del permiso:', permiso);
        this.permisoService.updatePermiso(permiso.postergacionId!, permiso).subscribe(() => {
            alert(`Estado cambiado a ${nuevoEstado}.`);
            this.loadPermisos();
        });
    }

    clearForm() {
        this.permiso = {
            medicoId: 0,
            tipoPostergacion: 'Por Hora',
            fechaInicio: new Date(),
            estado: 'Pendiente',
            motivo: ''
        };
        this.isEditing = false;
        this.onTipoPostergacionChange(); // Resetea `mostrarHoras` en función del tipo
    }

    onTipoPostergacionChange() {
        // Verifica si debe mostrar campos de hora
        this.mostrarHoras = this.permiso.tipoPostergacion === 'Por Hora';
    }

    formatDate(date: Date | string): string {
        const d = new Date(date);
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    }

    formatTime(time: string | Date): string {
        const t = new Date(`1970-01-01T${time}`);
        const hours = String(t.getHours()).padStart(2, '0');
        const minutes = String(t.getMinutes()).padStart(2, '0');
        const seconds = String(t.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }
}
