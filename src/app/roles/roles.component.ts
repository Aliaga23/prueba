import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';
import { Role } from '../models/role.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];
  newRole: Partial<Role> = { nombre: '' };
  editingRole: Partial<Role> | null = null;

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    this.fetchRoles();
  }

  // Obtener todos los roles y ordenarlos por ID
  fetchRoles() {
    this.roleService.getRoles().subscribe((data) => {
      this.roles = data.sort((a, b) => a.id - b.id);
    });
  }

  // Crear un nuevo rol
  createRole() {
    if (this.newRole.nombre && this.newRole) {
      this.roleService.createRole(this.newRole as Role).subscribe(() => {
        this.fetchRoles();
        this.newRole = { nombre: '' };
      });
    }
  }

  // Iniciar edición de un rol
  editRole(role: Role) {
    this.editingRole = { ...role };
  }

  // Actualizar el rol en edición
  updateRole() {
    if (this.editingRole && this.editingRole.id) {
      this.roleService.updateRole(this.editingRole.id, this.editingRole as Role).subscribe(() => {
        this.fetchRoles();
        this.editingRole = null;
      });
    }
  }

  // Cancelar la edición
  cancelEdit() {
    this.editingRole = null;
  }

  // Eliminar un rol
  deleteRole(roleId: number) {
    if (confirm('Are you sure you want to delete this role?')) {
      this.roleService.deleteRole(roleId).subscribe(() => {
        this.fetchRoles();
      });
    }
  }
}
