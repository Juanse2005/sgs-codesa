import { Component, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { RouterOutlet } from '@angular/router';

/**
 * Componente principal de layout de la aplicación.
 *
 * Contiene la barra lateral de navegación, la lógica para mostrar/ocultar menús,
 * animaciones de transición entre rutas y el manejo del cierre de sesión.
 */
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class LayoutComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
  user: any = {};
  items: MenuItem[] = [];

  constructor(private authService: AuthService) {
    window.addEventListener('resize', () => {
      this.isLargeScreen = window.innerWidth > 768;
      if (this.isLargeScreen) {
        this.sidebarCollapsed = false;
      }
    });
  }

  /** Inicializa el componente cargando el usuario y definiendo los ítems del menú. */
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userToken') || '{}');

    this.items = [
      { label: 'Inicio', icon: 'pi pi-home', routerLink: ['/dashboard'] },
      { label: 'Personas', icon: 'pi pi-users', routerLink: ['/personas'] },
      {
        label: 'Estudiantes',
        icon: 'pi pi-users',
        routerLink: ['/estudiantes'],
      },
      { label: 'Profesores', icon: 'pi pi-users', routerLink: ['/profesores'] },
      {
        label: 'Administrativos',
        icon: 'pi pi-crown',
        routerLink: ['/administrativos'],
      },
      {
        label: 'Cursos',
        icon: 'pi pi-graduation-cap',
        routerLink: ['/cursos'],
      },
      {
        label: 'Inscricpiones',
        icon: 'pi pi-clipboard',
        routerLink: ['/inscripciones'],
      },
    ];
  }

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  sidebarCollapsed = false;
  isLargeScreen = window.innerWidth > 768;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  /** Cierra sesión y redirige al login */
  logOut() {
    this.authService.logout();
  }
}
