import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule], // Importa CommonModule y RouterModule
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isCollapsed = false;
  adminOpen = true;
  pacientesOpen = false;
  horariosOpen = false;
  reservasOpen = false;
  medicamentosOpen = false;
  laboratorioOpen = false;
  constructor(private router: Router) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
