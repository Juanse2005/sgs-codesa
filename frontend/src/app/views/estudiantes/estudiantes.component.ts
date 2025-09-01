import { Component, ViewChild } from '@angular/core';
import { Estudiante } from '../../shared/models/estudiante/estudiante';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EstudianteService } from '../../shared/services/estudiante/estudiante.service';
import { APIENDPOINT } from '../../config/configuration';
import { Personas } from '../../shared/models/personas/personas';

/**
 * Componente para la gestión de Estudiantes.
 *
 * Permite listar, crear, editar y eliminar estudiantes.
 * Ofrece funcionalidades de búsqueda, selección y confirmación de borrado.
 */
@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css',
})
export class EstudiantesComponent {
  @ViewChild('dt') dt!: Table;
  totalRecords: number = 0;
  lastLazyLoadEvent: any;

  estudianteSeleccionado: string = '';

  personas: Personas[] = [];

  estudiantes: Estudiante[] = [];

  estudiante_form: Estudiante = {} as Estudiante;
  selectedEstudiante: Estudiante = {} as Estudiante;

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
    private readonly estudianteService: EstudianteService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  /** Inicializa el componente cargando los metodos*/
  ngOnInit(): void {
    this.getAllPersonas();
    this.getAllEstudiantes({ first: 0, rows: 5 });
  }

  /**
   * Maneja el cambio de persona seleccionada.
   * Asigna la persona seleccionada al formulario de administrativo.
   * @param id ID de la persona seleccionada
   */
  onPersonaChange(id: number) {
    const persona = this.personas.find((p) => p.id_persona === +id);
    if (persona) {
      this.selectedPersona = persona;
      this.estudiante_form = {
        ...persona,
        numero_matricula: '',
        grado: '',
      };
    }
  }

  /** Obtiene todas las personas */
  getAllPersonas() {
    this.estudianteService.get(APIENDPOINT.Personas).subscribe({
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
   * Carga la lista de estudiantes de manera paginada desde el servicio.
   * Calcula la página y el tamaño a partir de los parámetros del evento del paginador
   * y actualiza la tabla, el total de registros y el estado de carga.
   */
  getAllEstudiantes(event: any) {
    this.lastLazyLoadEvent = event;
    this.loading = true;

    const page = event.first / event.rows;
    const size = event.rows;

    this.estudianteService.getPaginated(APIENDPOINT.Estudiantes, page, size).subscribe({
      next: (res) => {
        this.estudiantes = res.content;
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
   * Selecciona un estudiante por su ID de persona.
   * @param id_persona ID de la persona a buscar
   */
  selectEstudiante(id_persona: number) {
    this.estudianteService
      .getById(APIENDPOINT.Estudiantes, id_persona)
      .subscribe({
        next: (res) => {
          this.SuccessToast('Persona Seleccionada correctamente');
          this.selectedEstudiante = res;
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
   * Actualiza un estudiante existente.
   * @param id_persona ID del estudiante editar
   */
  putEstudiante(id_persona: number) {
    this.estudianteService
      .put(APIENDPOINT.Estudiantes, id_persona, this.selectedEstudiante)
      .subscribe({
        next: (res) => {
          this.SuccessToast('Persona editada correctamente');
          this.getAllEstudiantes(this.lastLazyLoadEvent || { first: 0, rows: 5 });
          this.visible_put = false;
        },
        error: (err) => {
          this.ErrorToast('Error al editar persona');
        },
      });
  }

  /** Crea un nuevo estudiante */
  postEstudiante() {
    this.estudianteService
      .post(APIENDPOINT.Estudiantes, this.estudiante_form)
      .subscribe({
        next: (res) => {
          this.SuccessToast('Persona creada correctamente');
          this.getAllEstudiantes(this.lastLazyLoadEvent || { first: 0, rows: 5 });
          this.visible_post = false;
        },
        error: (err) => {
          this.ErrorToast(err.error.message);
        },
      });
  }

  /**
   * Elimina un estudiante.
   * @param id_persona ID de la persona a eliminar
   */
  deleteEstudiante(id_persona: number) {
    this.estudianteService
      .delete(APIENDPOINT.Estudiantes, id_persona)
      .subscribe({
        next: (res) => {
          this.SuccessToast('Persona eliminada correctamente');
          this.getAllEstudiantes(this.lastLazyLoadEvent || { first: 0, rows: 5 });
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
   * Tarjeta de confirmacion para eliminar un estudiante
   * @param id_persona ID de la persona a eliminar
   */
  confirmDelete(id_persona: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este usuario?',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'p-button-danger',

      accept: () => {
        this.deleteEstudiante(id_persona);
      },
    });
  }
}
