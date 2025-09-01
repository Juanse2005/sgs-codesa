import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CursoService } from '../../shared/services/cursos/curso.service';
import { Curso } from '../../shared/models/curso/curso';
import { APIENDPOINT } from '../../config/configuration';
import { Personas } from '../../shared/models/personas/personas';
import { PersonasService } from '../../shared/services/personas/personas.service';

/**
 * Componente para la gestión de Cursos.
 *
 * Permite listar, crear, editar y eliminar Cursos.
 * Ofrece funcionalidades de búsqueda, selección y confirmación de borrado.
 */
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
})
export class CursosComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  totalRecords: number = 0;
  lastLazyLoadEvent: any;

  cursos: Curso[] = [];
  profesores: Personas[] = [];
  loading = false;
  searchValue = '';

  selectedCurso: Curso = {} as Curso;
  visible_put = false;

  curso_form: any = {};
  visible_post = false;

  selectedProfesorId!: number;
  selectedProfesor!: Personas;

  /**
   * Constructor en el cual se inyectan los servicios necesarios
   */
  constructor(
    private readonly cursoService: CursoService,
    private readonly personaService: PersonasService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  /** Inicializa el componente cargando los metodos*/
  ngOnInit(): void {
    this.getAllCursos({ first: 0, rows: 5 });
    this.getAllProfesores();
  }

  /**
   * Maneja el cambio de profesor seleccionado.
   * Asigna el profesor seleccionado al formulario de curso.
   * @param id ID del profesor seleccionado
   */
  onProfesorChange(id: number) {
    const prof = this.profesores.find((p) => p.id_persona === +id);
    if (prof) {
      this.selectedProfesor = prof;
      this.curso_form = {
        ...this.curso_form,
        id_profesor: prof.id_persona,
        nombrePersona: prof.nombre,
        apellido: prof.apellido,
        email: prof.email,
      };
    }
  }

  /**
   * Carga la lista de cursos de manera paginada desde el servicio.
   * Calcula la página y el tamaño a partir de los parámetros del evento del paginador
   * y actualiza la tabla, el total de registros y el estado de carga.
   */
  getAllCursos(event: any) {
    this.lastLazyLoadEvent = event;
    this.loading = true;

    const page = event.first / event.rows;
    const size = event.rows;

    this.cursoService.getPaginated(APIENDPOINT.Curso, page, size).subscribe({
      next: (res) => {
        this.cursos = res.content;
        this.totalRecords = res.totalElements;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  /** Obtiene todos los profesores*/
  getAllProfesores() {
    this.personaService.get(APIENDPOINT.Profesor).subscribe({
      next: (resp) => {
        this.profesores = resp.content;
      },
      error: () => {
        this.ErrorToast('Error al cargar profesores');
      },
    });
  }

  /** Limpia filtros de la tabla */
  clear(table: Table) {
    table.clear();
  }

  /**
   * Aplica un filtro global en la tabla.
   * @param event Evento del input
   */
  filtrarGlobal(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dt.filterGlobal(input.value, 'contains');
  }

  /**
   * Selecciona un curso por su ID y lo carga para edición.
   * @param id ID del curso
   */
  selectCurso(id: number) {
    this.loading = true;
    this.cursoService.getById(APIENDPOINT.Curso, id).subscribe({
      next: (curso) => {
        this.selectedCurso = curso;
        this.visible_put = true;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.ErrorToast('Error al obtener el curso');
      },
    });
  }

  /**
   * Actualiza un curso existente.
   * @param id ID del curso a actualizar
   */
  putCurso(id: number) {
    this.cursoService.put(APIENDPOINT.Curso, id, this.selectedCurso).subscribe({
      next: () => {
        this.SuccessToast('Curso actualizado correctamente');
        this.getAllCursos(this.lastLazyLoadEvent || { first: 0, rows: 5 });
        this.visible_put = false;
      },
      error: () => {
        this.ErrorToast('Error al actualizar el curso');
      },
    });
  }

  /** Crea un nuevo curso */
  postCurso() {
    this.cursoService.post(APIENDPOINT.Curso, this.curso_form).subscribe({
      next: () => {
        this.SuccessToast('Curso creado correctamente');
        this.getAllCursos(this.lastLazyLoadEvent || { first: 0, rows: 5 });
        this.visible_post = false;
        this.curso_form = {};
      },
      error: () => {
        this.ErrorToast('Error al crear el curso');
      },
    });
  }

  /**
   * Elimina un curso existente.
   * @param id ID del curso a eliminar
   */
  deleteCurso(id: number) {
    this.cursoService.delete(APIENDPOINT.Curso, id).subscribe({
      next: () => {
        this.SuccessToast('Curso eliminado correctamente');
        this.getAllCursos(this.lastLazyLoadEvent || { first: 0, rows: 5 });
      },
      error: () => {
        this.ErrorToast('Error al eliminar el curso');
      },
    });
  }

  /** Tarjetas de notificacion de exito y error */
  private SuccessToast(detail: string) {
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail });
  }

  private ErrorToast(detail: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail });
  }

  /**
   * Tarjeta de confirmacion para eliminar un curso
   * @param id_curso ID del curso a eliminar
   */
  confirmDelete(id_curso: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este curso?',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.deleteCurso(id_curso);
      },
    });
  }
}
