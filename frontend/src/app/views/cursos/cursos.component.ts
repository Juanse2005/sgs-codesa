// cursos.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CursoService } from '../../shared/services/cursos/curso.service';
import { Curso } from '../../shared/models/curso/curso';
import { APIENDPOINT } from '../../config/configuration';
import { Personas } from '../../shared/models/personas/personas';
import { PersonasService } from '../../shared/services/personas/personas.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  cursos: Curso[] = [];
  profesores: Personas[] = [];
  loading = false;
  searchValue = '';

  // Para edición
  selectedCurso: Curso = {} as Curso;
  visible_put = false;

  // Para creación
  curso_form: any = {};
  visible_post = false;

  selectedProfesorId!: number;
  selectedProfesor!: Personas;

  constructor(
    private readonly cursoService: CursoService,
    private readonly personaService: PersonasService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getAllCursos();
    this.getAllProfesores();
  }

  /** Limpia filtros de la tabla */
  clear(table: Table) {
    table.clear();
  }

  /** Filtro global */
  filtrarGlobal(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dt.filterGlobal(input.value, 'contains');
  }

  /** Obtiene todos los cursos */
  getAllCursos() {
    this.loading = true;
    this.cursoService.get(APIENDPOINT.Curso).subscribe({
      next: resp => {
        this.cursos = resp.content;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.ErrorToast('Error al cargar cursos');
      }
    });
  }

  /** Obtiene lista de profesores para el select */
  getAllProfesores() {
    this.personaService.get(APIENDPOINT.Profesor).subscribe({
      next: resp => {
        this.profesores = resp.content;
      },
      error: () => {
        this.ErrorToast('Error al cargar profesores');
      }
    });
  }

  /** Al cambiar selección de profesor, asigna datos al form */
  onProfesorChange(id: number) {
    const prof = this.profesores.find(p => p.id_persona === +id);
    if (prof) {
      this.selectedProfesor = prof;
      this.curso_form = {
        ...this.curso_form,
        id_profesor: prof.id_persona,
        nombrePersona: prof.nombre,
        apellido: prof.apellido,
        email: prof.email
      };
    }
  }

  /** Selecciona un curso para editar */
  selectCurso(id: number) {
    this.loading = true;
    this.cursoService.getById(APIENDPOINT.Curso, id).subscribe({
      next: curso => {
        this.selectedCurso = curso;
        this.visible_put = true;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.ErrorToast('Error al obtener el curso');
      }
    });
  }

  /** Actualiza un curso */
  putCurso(id: number) {
    this.cursoService.put(APIENDPOINT.Curso, id, this.selectedCurso).subscribe({
      next: () => {
        this.SuccessToast('Curso actualizado correctamente');
        this.getAllCursos();
        this.visible_put = false;
      },
      error: () => {
        this.ErrorToast('Error al actualizar el curso');
      }
    });
  }

  /** Crea un nuevo curso */
  postCurso() {
    this.cursoService.post(APIENDPOINT.Curso, this.curso_form).subscribe({
      next: () => {
        this.SuccessToast('Curso creado correctamente');
        this.getAllCursos();
        this.visible_post = false;
        this.curso_form = {};
      },
      error: () => {
        this.ErrorToast('Error al crear el curso');
      }
    });
  }

  /** Elimina un curso */
  deleteCurso(id: number) {
    this.cursoService.delete(APIENDPOINT.Curso, id).subscribe({
      next: () => {
        this.SuccessToast('Curso eliminado correctamente');
        this.getAllCursos();
      },
      error: () => {
        this.ErrorToast('Error al eliminar el curso');
      }
    });
  }

  /** Toast de éxito */
  private SuccessToast(detail: string) {
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail });
  }

  /** Toast de error */
  private ErrorToast(detail: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail });
  }
  confirmDelete(id_curso: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este curso?',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.deleteCurso(id_curso);
      }
    });
  }
}