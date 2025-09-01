import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { EstudianteService } from '../../shared/services/estudiante/estudiante.service';
import { APIENDPOINT } from '../../config/configuration';
import { PersonasService } from '../../shared/services/personas/personas.service';
import { ProfesorService } from '../../shared/services/profesores/profesor.service';
import { CursoService } from '../../shared/services/cursos/curso.service';
import { InscripcionService } from '../../shared/services/inscripcion/inscripcion.service';
import { forkJoin } from 'rxjs';
import { AdministrativoService } from '../../shared/services/administrativos/administrativo.service';

/**
 * Componente Dashboard
 *
 * Este componente muestra un resumen de datos estadísticos del sistema
 * incluyendo el total de personas, estudiantes, profesores, cursos,
 * inscripciones y administrativos.
 *
 * Además, presenta un gráfico de PrimeNG con los totales
 * de estudiantes, profesores y administrativos.
 */

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  data: any;
  total_personas: any;
  total_estudiantes: any;
  total_profesores: any;
  total_cursos: any;
  total_inscripciones: any;
  total_administrativos: any;

  options: any;

  /**
   * Constructor en el cual se inyectan los servicios necesarios
   */
  constructor(
    private readonly estudianteService: EstudianteService,
    private readonly personaService: PersonasService,
    private readonly profesorService: ProfesorService,
    private readonly cursoService: CursoService,
    private readonly inscripcionService: InscripcionService,
    private readonly administrativoService: AdministrativoService
  ) {}

  /** Inicializa el componente cargando los metodos*/
  ngOnInit() {
    this.getTotalPersonas();
    this.getTotalEstudiantes();
    this.getTotalProfesores();
    this.getTotalCursos();
    this.getTotalInscripciones();
    this.loadTotalsAndChart();
  }

  /**
   * Carga los totales de estudiantes, profesores y administrativos en paralelo
   * y luego inicializa el gráfico.
   */
  loadTotalsAndChart() {
    forkJoin({
      estudiantes: this.estudianteService.getTotal(
        APIENDPOINT.TotalEstudiantes
      ),
      profesores: this.profesorService.getTotal(APIENDPOINT.TotalProfesores),
      administrativos: this.administrativoService.getTotal(
        APIENDPOINT.TotalAdministrativos
      ), // suponiendo que tengas este endpoint
    }).subscribe(({ estudiantes, profesores, administrativos }) => {
      this.total_estudiantes = estudiantes.total;
      this.total_profesores = profesores.total;
      this.total_administrativos = administrativos.total;

      this.initChart();
    });
  }

  /**
   * Inicializa la configuración y los datos del gráfico de barras.
   * Muestra la comparación entre estudiantes, profesores y administrativos.
   */
  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['Estudiantes', 'Profesores', 'Administrativos'],
      datasets: [
        {
          type: 'bar',
          label: 'Total',
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--orange-500'),
          ],
          borderWidth: 2,
          data: [
            this.total_estudiantes,
            this.total_profesores,
            this.total_administrativos,
          ],
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: { legend: { labels: { color: textColor } } },
      scales: {
        x: {
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder },
        },
        y: {
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder },
        },
      },
    };
  }

  /** Obtiene todas las personas */
  getTotalPersonas() {
    this.personaService.getTotal(APIENDPOINT.TotalPersonas).subscribe({
      next: (res: any) => {
        this.total_personas = res.total;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  /** Obtiene todos los estudiantes */
  getTotalEstudiantes() {
    this.estudianteService.getTotal(APIENDPOINT.TotalEstudiantes).subscribe({
      next: (res: any) => {
        this.total_estudiantes = res.total;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  /** Obtiene todos los profesores*/
  getTotalProfesores() {
    this.profesorService.getTotal(APIENDPOINT.TotalProfesores).subscribe({
      next: (res: any) => {
        this.total_profesores = res.total;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  /** Obtiene todos los cursos */
  getTotalCursos() {
    this.cursoService.getTotal(APIENDPOINT.TotalCursos).subscribe({
      next: (res: any) => {
        this.total_cursos = res.total;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  /** Obtiene todas las inscripciones */
  getTotalInscripciones() {
    this.inscripcionService.getTotal(APIENDPOINT.TotalInscripciones).subscribe({
      next: (res: any) => {
        this.total_inscripciones = res.total;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
