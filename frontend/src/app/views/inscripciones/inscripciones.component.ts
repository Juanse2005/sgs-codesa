import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { APIENDPOINT } from '../../config/configuration';

import { Inscripcion } from '../../shared/models/inscripcion/inscripcion';
import { Estudiante } from '../../shared/models/estudiante/estudiante';
import { Curso } from '../../shared/models/curso/curso';

import { InscripcionService } from '../../shared/services/inscripcion/inscripcion.service';
import { EstudianteService } from '../../shared/services/estudiante/estudiante.service';
import { CursoService } from '../../shared/services/cursos/curso.service';

/**
 * Componente para la gestión de Inscripciones.
 *
 * Permite listar, crear, editar y eliminar Inscripciones.
 * Ofrece funcionalidades de búsqueda, selección y confirmación de borrado.
 */
@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.css',
})
export class InscripcionesComponent {
  @ViewChild('dt') dt!: Table;
  totalRecords: number = 0;
  lastLazyLoadEvent: any;

  inscripcion: Inscripcion[] = [];
  estudiantes: Estudiante[] = [];
  cursos: Curso[] = [];
  searchValue: string = '';

  selectedInscripcion: Inscripcion = {} as Inscripcion;
  inscripcion_form: Inscripcion = {} as Inscripcion;

  loading = true;
  visible_post = false;
  visible_put = false;

  /**
   * Constructor en el cual se inyectan los servicios necesarios
   */
  constructor(
    private inscripcionService: InscripcionService,
    private estudianteService: EstudianteService,
    private cursoService: CursoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  /** Inicializa el componente cargando los metodos*/
  ngOnInit(): void {
    this.getInscripciones({ first: 0, rows: 5 });
    this.getEstudiantes();
    this.getCursos();
  }

  /**
   * Carga la lista de inscripciones de manera paginada desde el servicio.
   * Calcula la página y el tamaño a partir de los parámetros del evento del paginador
   * y actualiza la tabla, el total de registros y el estado de carga.
   */
  getInscripciones(event: any) {
    this.lastLazyLoadEvent = event;
    this.loading = true;

    const page = event.first / event.rows;
    const size = event.rows;

    this.inscripcionService
      .getPaginated(APIENDPOINT.Inscripciones, page, size)
      .subscribe({
        next: (res) => {
          this.inscripcion = res.content;
          this.totalRecords = res.totalElements;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  /** Obtiene todos los estudiantes*/
  getEstudiantes() {
    this.estudianteService.get(APIENDPOINT.Estudiantes).subscribe({
      next: (res) => {
        this.estudiantes = res.content;
      },
      error: () => {
        this.ErrorToast('Error al obtener estudiantes');
      },
    });
  }

  /** Obtiene todos los cursos */
  getCursos() {
    this.cursoService.get(APIENDPOINT.Curso).subscribe({
      next: (res) => {
        this.cursos = res.content;
      },
      error: () => {
        this.ErrorToast('Error al obtener cursos');
      },
    });
  }

  /**
   * Crea una nueva inscripción
   * Por defecto asigna la fecha actual como `fecha_inscripcion`
   */
  postInscripcion() {
    this.inscripcion_form.fecha_inscripcion = new Date()
      .toISOString()
      .split('T')[0]; // hoy por defecto
    this.inscripcionService
      .post(APIENDPOINT.Inscripciones, this.inscripcion_form)
      .subscribe({
        next: () => {
          this.SuccessToast('Inscripción creada correctamente');
          this.getInscripciones(
            this.lastLazyLoadEvent || { first: 0, rows: 5 }
          );
          this.visible_post = false;
          this.inscripcion_form = {} as Inscripcion;
        },
        error: () => {
          this.ErrorToast('Error al crear inscripción');
        },
      });
  }

  /**
   * Abre el modal de edición con la inscripción seleccionada
   */
  putInscripcion(inscripcion: Inscripcion) {
    this.selectedInscripcion = { ...inscripcion };
    this.visible_put = true;
  }

  /**
   * Envía los cambios realizados en la inscripción seleccionada
   */
  putEdicion() {
    this.inscripcionService
      .put(
        APIENDPOINT.Inscripciones,
        this.selectedInscripcion.id_inscripcion,
        this.selectedInscripcion
      )
      .subscribe({
        next: () => {
          this.SuccessToast('Inscripción actualizada');
          this.getInscripciones(
            this.lastLazyLoadEvent || { first: 0, rows: 5 }
          );
          this.visible_put = false;
        },
        error: () => {
          this.ErrorToast('Error al actualizar inscripción');
        },
      });
  }

  /**
   * Elimina una inscripcion.
   * @param id_inscripcion ID de la inscripcion a eliminar
   */
  deleteInscripcion(id_inscripcion: number) {
    this.inscripcionService
      .delete(APIENDPOINT.Inscripciones, id_inscripcion)
      .subscribe({
        next: () => {
          this.SuccessToast('Inscripción eliminada');
          this.getInscripciones(
            this.lastLazyLoadEvent || { first: 0, rows: 5 }
          );
        },
        error: () => {
          this.ErrorToast('Error al eliminar inscripción');
        },
      });
  }

  /** Limpia los filtros de la tabla */
  clear(table: any) {
    table.clear();
  }

  /**
   * Aplica un filtro global en la tabla.
   * @param event Evento del input
   */
  filtrarGlobal(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dt.filterGlobal(input.value, 'contains');
  }

  /** Tarjetas de notificacion de exito y error */
  SuccessToast(detail: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail,
    });
  }

  ErrorToast(detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail,
    });
  }

  /**
   * Tarjeta de confirmacion para eliminar una inscripcion
   * @param id_inscripcion ID de la inscripcion a eliminar
   */
  confirmDelete(id_inscripcion: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar esta inscripción?',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.deleteInscripcion(id_inscripcion);
      },
    });
  }
}
