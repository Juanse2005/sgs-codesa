import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      { label: 'Inicio', icon: 'pi pi-home', routerLink: ['/dashboard'] },
      { label: 'Personas', icon: 'pi pi-users', routerLink: ['/personas'] },
      { label: 'Estudiantes', icon: 'pi pi-users', routerLink: ['/estudiantes'] },
      { label: 'Profesores', icon: 'pi pi-users', routerLink: ['/profesores'] },
      { label: 'Administrativos', icon: 'pi pi-users', routerLink: ['/administrativos'] },
      { label: 'Cursos', icon: 'pi pi-users', routerLink: ['/cursos'] },
      { label: 'Inscricpiones', icon: 'pi pi-users', routerLink: ['/inscripciones'] },
      { label: 'Salir', icon: 'pi pi-sign-out', routerLink: ['/login'] },
    ];
  }

  sidebarCollapsed = false;
  isLargeScreen = window.innerWidth > 768;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  constructor() {
    window.addEventListener('resize', () => {
      this.isLargeScreen = window.innerWidth > 768;
      if (this.isLargeScreen) {
        this.sidebarCollapsed = false;
      }
    });
  }

}
