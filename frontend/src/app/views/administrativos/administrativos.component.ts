import { Component, ViewChild } from '@angular/core';
import { APIENDPOINT } from '../../config/configuration';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdministrativoService } from '../../shared/services/administrativos/administrativo.service';
import { Personas } from '../../shared/models/personas/personas';
import { Table } from 'primeng/table';
import { Administrativo } from '../../shared/models/administrativo/administrativo';

/**
 * Componente para la gestión de Administrativos.
 *
 * Permite listar, crear, editar y eliminar administrativos.
 * Ofrece funcionalidades de búsqueda, selección y confirmación de borrado.
 */
@Component({
  selector: 'app-administrativos',
  templateUrl: './administrativos.component.html',
  styleUrl: './administrativos.component.css',
})
export class AdministrativosComponent {
  @ViewChild('dt') dt!: Table;
  totalRecords: number = 0;
  lastLazyLoadEvent: any;

  administrativoSeleccionado: string = '';

  personas: Personas[] = [];

  administrativo: Administrativo[] = [];

  administrativo_form: Administrativo = {} as Administrativo;
  selectedAdministrativo: Administrativo = {} as Administrativo;

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
    private readonly administrativoService: AdministrativoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  /** Inicializa el componente cargando los metodos*/
  ngOnInit(): void {
    this.getAllPersonas();
    this.getAllAdministrativo({ first: 0, rows: 5 });
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
      this.administrativo_form = {
        ...persona,
        cargo: '',
        departamento: '',
      };
    }
  }

  /** Obtiene todas las personas */
  getAllPersonas() {
    this.administrativoService.get(APIENDPOINT.Personas).subscribe({
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
   * Carga la lista de administrativos de manera paginada desde el servicio.
   * Calcula la página y el tamaño a partir de los parámetros del evento del paginador
   * y actualiza la tabla, el total de registros y el estado de carga.
   */
  getAllAdministrativo(event: any) {
    this.lastLazyLoadEvent = event;
    this.loading = true;

    const page = event.first / event.rows;
    const size = event.rows;

    this.administrativoService.getPaginated(APIENDPOINT.Administrativo, page, size).subscribe({
      next: (res) => {
        this.administrativo = res.content;
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
   * Selecciona un administrativo por su ID de persona.
   * @param id_persona ID de la persona a buscar
   */
  selectAdministrativo(id_persona: number) {
    this.administrativoService
      .getById(APIENDPOINT.Administrativo, id_persona)
      .subscribe({
        next: (res) => {
          this.SuccessToast('Persona Seleccionada correctamente');
          this.selectedAdministrativo = res;
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
   * Actualiza un administrativo existente.
   * @param id_persona ID del administrativo a editar
   */
  putAdministrativo(id_persona: number) {
    this.administrativoService
      .put(APIENDPOINT.Administrativo, id_persona, this.selectedAdministrativo)
      .subscribe({
        next: (res) => {
          this.SuccessToast('Persona editada correctamente');
          this.getAllAdministrativo(this.lastLazyLoadEvent || { first: 0, rows: 5 });
          this.visible_put = false;
        },
        error: (err) => {
          this.ErrorToast('Error al editar persona');
        },
      });
  }

  /** Crea un nuevo administrativo */
  postAdministrativo() {
    this.administrativoService
      .post(APIENDPOINT.Administrativo, this.administrativo_form)
      .subscribe({
        next: (res) => {
          this.SuccessToast('Persona creada correctamente');
          this.getAllAdministrativo(this.lastLazyLoadEvent || { first: 0, rows: 5 });
          this.visible_post = false;
        },
        error: (err) => {
          this.ErrorToast(err.error.message);
        },
      });
  }

  /**
   * Elimina un administrativo.
   * @param id_persona ID de la persona a eliminar
   */
  deleteAdministrativo(id_persona: number) {
    this.administrativoService
      .delete(APIENDPOINT.Administrativo, id_persona)
      .subscribe({
        next: (res) => {
          this.SuccessToast('Persona eliminada correctamente');
          this.getAllAdministrativo(this.lastLazyLoadEvent || { first: 0, rows: 5 });
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
   * Tarjeta de confirmacion para eliminar un administrativo
   * @param id_persona ID de la persona a eliminar
   */
  confirmDelete(id_persona: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este administrativo?',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.deleteAdministrativo(id_persona);
      },
    });
  }
}
