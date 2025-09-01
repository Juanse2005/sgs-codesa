import { Component, ViewChild } from '@angular/core';
import { APIENDPOINT } from '../../config/configuration';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProfesorService } from '../../shared/services/profesores/profesor.service';
import { Personas } from '../../shared/models/personas/personas';
import { Table } from 'primeng/table';
import { Profesor } from '../../shared/models/profesores/personas';

/**
 * Componente para la gestión de profesores.
 *
 * Permite listar, crear, editar y eliminar administrativos.
 * Ofrece funcionalidades de búsqueda, selección y confirmación de borrado.
 */
@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrl: './profesores.component.css',
})
export class ProfesoresComponent {
  @ViewChild('dt') dt!: Table;
  totalRecords: number = 0;
  lastLazyLoadEvent: any;

  profesorSeleccionado: string = '';
  personas: Personas[] = [];

  profesor: Profesor[] = [];

  profesor_form: Profesor = {} as Profesor;
  selectedProfesor: Profesor = {} as Profesor;

  selectedPersonaId!: number;
  selectedPersona!: Personas;

  loading = true;
  searchValue = '';
  visiblePasswordId: number | null = null;
  showPasswordPost: boolean = false;
  showPasswordPut: boolean = false;
  visible_put: boolean = false;
  visible_post: boolean = false;

  email: string = '';

  /**
   * Constructor en el cual se inyectan los servicios necesarios
   */
  constructor(
    private readonly profesorService: ProfesorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  /** Inicializa el componente cargando los metodos*/
  ngOnInit(): void {
    this.getAllPersonas();
    this.getAllProfesor({ first: 0, rows: 5 });
  }

  /**
   * Maneja el cambio de persona seleccionada.
   * Asigna la persona seleccionada al formulario de persona.
   * @param id ID de la persona seleccionada
   */
  onPersonaChange(id: number) {
    const persona = this.personas.find((p) => p.id_persona === +id);
    if (persona) {
      this.selectedPersona = persona;
      this.profesor_form = {
        ...persona,
        especialidad: '',
        fecha_contratacion: '',
      };
    }
  }

  /** Obtiene todas las personas */
  getAllPersonas() {
    this.profesorService.get(APIENDPOINT.Personas).subscribe({
      next: (response) => {
        this.personas = response.content;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  /**
   * Carga la lista de profesores de manera paginada desde el servicio.
   * Calcula la página y el tamaño a partir de los parámetros del evento del paginador
   * y actualiza la tabla, el total de registros y el estado de carga.
   */
  getAllProfesor(event: any) {
    this.lastLazyLoadEvent = event;
    this.loading = true;

    const page = event.first / event.rows;
    const size = event.rows;

    this.profesorService
      .getPaginated(APIENDPOINT.Profesor, page, size)
      .subscribe({
        next: (res) => {
          this.profesor = res.content;
          this.totalRecords = res.totalElements;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
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

  /**
   * Selecciona un profesor por su ID de persona.
   * @param id_persona ID de la persona a buscar
   */
  selectProfesor(id_persona: number) {
    this.profesorService.getById(APIENDPOINT.Profesor, id_persona).subscribe({
      next: (res) => {
        this.SuccessToast('Persona Seleccionada correctamente');
        this.selectedProfesor = res;
        this.visible_put = true;
        this.loading = false;
      },
      error: (err) => {
        this.ErrorToast('Error al obtener persona');
        this.loading = false;
      },
    });
  }

  /**
   * Actualiza un profesor existente.
   * @param id_persona ID del profesor a editar
   */
  putProfesor(id_persona: number) {
    this.profesorService
      .put(APIENDPOINT.Profesor, id_persona, this.selectedProfesor)
      .subscribe({
        next: (res) => {
          this.SuccessToast('Persona editada correctamente');
          this.getAllProfesor(this.lastLazyLoadEvent || { first: 0, rows: 5 });
          this.visible_put = false;
        },
        error: (err) => {
          this.ErrorToast('Error al editar persona');
        },
      });
  }

  /** Crea un nuevo profesor */
  postProfesor() {
    this.profesorService
      .post(APIENDPOINT.Profesor, this.profesor_form)
      .subscribe({
        next: (res) => {
          this.SuccessToast('Persona creada correctamente');
          this.getAllProfesor(this.lastLazyLoadEvent || { first: 0, rows: 5 });
          this.visible_post = false;
        },
        error: (err) => {
          this.ErrorToast(err.error.message);
        },
      });
  }

  /**
   * Elimina un profesor.
   * @param id_persona ID de la persona a eliminar
   */
  deleteProfesor(id_persona: number) {
    this.profesorService.delete(APIENDPOINT.Profesor, id_persona).subscribe({
      next: (res) => {
        this.SuccessToast('Persona eliminada correctamente');
        this.getAllProfesor(this.lastLazyLoadEvent || { first: 0, rows: 5 });
      },
      error: (err) => {
        this.ErrorToast('Error al eliminar persona');
      },
    });
  }

  /** Tarjetas de notificacion de exito y error */
  SuccessToast(detail: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: detail,
    });
  }

  ErrorToast(detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: detail,
    });
  }

  /**
   * Tarjeta de confirmacion para eliminar un profesor
   * @param id_persona ID de la persona a eliminar
   */
  confirmDelete(id_persona: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este profesor?',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.deleteProfesor(id_persona);
      },
    });
  }
}
