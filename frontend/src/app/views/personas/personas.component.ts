import { Component, ViewChild } from '@angular/core';
import { PersonasService } from '../../shared/services/personas/personas.service';
import { APIENDPOINT } from '../../config/configuration';
import { Personas } from '../../shared/models/personas/personas';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

/**
 * Componente para la gestión de personas.
 *
 * Permite listar, crear, editar y eliminar personas.
 * Ofrece funcionalidades de búsqueda, selección y confirmación de borrado.
 */
@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.css',
})
export class PersonasComponent {
  @ViewChild('dt') dt!: Table;
  totalRecords: number = 0;
  lastLazyLoadEvent: any;

  personas: Personas[] = [];
  personas_form: Personas = {} as Personas;
  selectedPersona: Personas = {} as Personas;

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
    private readonly personasService: PersonasService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  /** Inicializa el componente cargando los metodos*/
  ngOnInit(): void {
    this.getAllPersonas({ first: 0, rows: 5 });
  }

  /**
   * Carga la lista de personas de manera paginada desde el servicio.
   * Calcula la página y el tamaño a partir de los parámetros del evento del paginador
   * y actualiza la tabla, el total de registros y el estado de carga.
   */
  getAllPersonas(event: any) {
    this.lastLazyLoadEvent = event;
    this.loading = true;

    const page = event.first / event.rows;
    const size = event.rows;

    this.personasService.getPaginated(APIENDPOINT.Personas, page, size).subscribe({
      next: (res) => {
        this.personas = res.content;
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
   * Selecciona una persona por su ID.
   * @param id_persona ID de la persona a buscar
   */
  selectPersonas(id_persona: number) {
    this.personasService.getById(APIENDPOINT.Personas, id_persona).subscribe({
      next: (res) => {
        this.SuccessToast('Persona Seleccionada correctamente');
        this.selectedPersona = res;
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
   * Actualiza una persona existente.
   * @param id_persona ID de la persona a editar
   */
  putPersonas(id_persona: number) {
    this.personasService
      .put(APIENDPOINT.Personas, id_persona, this.selectedPersona)
      .subscribe({
        next: (res) => {
          this.SuccessToast('Persona editada correctamente');
          this.getAllPersonas(this.lastLazyLoadEvent || { first: 0, rows: 5 });
          this.visible_put = false;
        },
        error: (err) => {
          this.ErrorToast('Error al editar persona');
        },
      });
  }

  /** Crea una nueva persona */
  postPersonas() {
    this.personasService
      .post(APIENDPOINT.Personas, this.personas_form)
      .subscribe({
        next: (res) => {
          this.SuccessToast('Persona creada correctamente');
          this.getAllPersonas(this.lastLazyLoadEvent || { first: 0, rows: 5 });
          this.visible_post = false;
        },
        error: (err) => {
          this.ErrorToast('Error al crear persona');
        },
      });
  }

  /**
   * Elimina una persona.
   * @param id_persona ID de la persona a eliminar
   */
  deletePersonas(id_persona: number) {
    this.personasService.delete(APIENDPOINT.Personas, id_persona).subscribe({
      next: (res) => {
        this.SuccessToast('Persona eliminada correctamente');
        this.getAllPersonas(this.lastLazyLoadEvent || { first: 0, rows: 5 });
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
   * Tarjeta de confirmacion para eliminar una persona
   * @param id_persona ID de la persona a eliminar
   */
  confirmDelete(id_persona: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar esta persona?',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.deletePersonas(id_persona);
      },
    });
  }
}
