// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { PacientesComponent } from './paciente/paciente.component';
import { MedicosComponent } from './medicos/medicos.component';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { MedicoEspecialidadComponent } from './medico-especialidad/medico-especialidad.component';
import { HorariosComponent } from './horarios/horarios.component';
import { DocumentosLaboratorioComponent } from './documentos-laboratorio/documentos-laboratorio.component';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { HorarioMedicoEspecialidadComponent } from './horario-medico-especialidad/horario-medico-especialidad.component';
import { CuposComponent } from './cupo/cupo.component';
import { ReservasComponent } from './reserva/reserva.component';
import { ConsultaMedicaComponent } from './consulta-medica/consulta-medica.component';
import { PermisoPostergacionComponent } from './permiso-postergacion/permiso-postergacion.component';
import { MedicamentoComponent } from './medicamento/medicamento.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: [1] }, // Solo accesible para administrador (rolId=1)
    children: [
      { path: 'roles', component: RolesComponent },
      { path: 'users', component: UsersComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'permisos', component: PermissionsComponent },
      { path: 'pacientes', component: PacientesComponent },
      { path: 'medicos', component: MedicosComponent },
      { path: 'especialidades', component: EspecialidadesComponent },
      { path: 'asociar-especialidad-medico', component: MedicoEspecialidadComponent },
      { path: 'horario', component: HorariosComponent },
      { path: 'asignar', component: HorarioMedicoEspecialidadComponent },
      { path: 'cupo', component: CuposComponent },
      { path: 'reserva', component: ReservasComponent },
      { path: 'postergacion', component: PermisoPostergacionComponent },
      { path: 'medicamento', component: MedicamentoComponent },
      { path: 'docu-laboratorio', component: DocumentosLaboratorioComponent },
      { path: 'historial', component: HistoriaClinicaComponent },
    ]
  },
  {
    path: 'consulta-medica',
    component: ConsultaMedicaComponent,
    canActivate: [AuthGuard],
    data: { roles: [1, 3] } // Accesible tanto para administrador (rolId=1) como para médico (rolId=3)
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
