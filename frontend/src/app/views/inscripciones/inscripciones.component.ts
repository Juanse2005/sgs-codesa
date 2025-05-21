import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { APIENDPOINT } from '../../config/configuration';

import { Inscripcion } from '../../shared/models/inscripcion/inscripcion';
import { Estudiante } from '../../shared/models/estudiante/estudiante';
import { Curso } from '../../shared/models/curso/curso';

import { InscripcionService } from '../../shared/services/inscripcion/inscripcion.service';
import { EstudianteService } from '../../shared/services/estudiante/estudiante.service';
import { CursoService } from '../../shared/services/cursos/curso.service';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.css'
})
export class InscripcionesComponent {
  @ViewChild('dt') dt!: Table;

  inscripcion: Inscripcion[] = [];
  estudiantes: Estudiante[] = [];
  cursos: Curso[] = [];
  searchValue: string = '';

  selectedInscripcion: Inscripcion = {} as Inscripcion;
  inscripcion_form: Inscripcion = {} as Inscripcion;

  loading = true;
  visible_post = false;
  visible_put = false;

  constructor(
    private inscripcionService: InscripcionService,
    private estudianteService: EstudianteService,
    private cursoService: CursoService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getInscripciones();
    this.getEstudiantes();
    this.getCursos();
  }

  getInscripciones() {
    this.inscripcionService.get(APIENDPOINT.Inscripciones).subscribe({
      next: (res) => {
        this.inscripcion = res.content;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.ErrorToast('Error al obtener inscripciones');
      }
    });
  }

  getEstudiantes() {
    this.estudianteService.get(APIENDPOINT.Estudiantes).subscribe({
      next: (res) => {
        this.estudiantes = res.content;
      },
      error: () => {
        this.ErrorToast('Error al obtener estudiantes');
      }
    });
  }

  getCursos() {
    this.cursoService.get(APIENDPOINT.Curso).subscribe({
      next: (res) => {
        this.cursos = res.content;
      },
      error: () => {
        this.ErrorToast('Error al obtener cursos');
      }
    });
  }

  postInscripcion() {
    this.inscripcion_form.fecha_inscripcion = new Date().toISOString().split('T')[0]; // hoy por defecto
    this.inscripcionService.post(APIENDPOINT.Inscripciones, this.inscripcion_form).subscribe({
      next: () => {
        this.SuccessToast('Inscripción creada correctamente');
        this.getInscripciones();
        this.visible_post = false;
        this.inscripcion_form = {} as Inscripcion;
      },
      error: () => {
        this.ErrorToast('Error al crear inscripción');
      }
    });
  }

  putInscripcion(inscripcion: Inscripcion) {
    this.selectedInscripcion = { ...inscripcion };
    this.visible_put = true;
  }

  putEdicion() {
    this.inscripcionService.put(APIENDPOINT.Inscripciones, this.selectedInscripcion.id_inscripcion, this.selectedInscripcion).subscribe({
      next: () => {
        this.SuccessToast('Inscripción actualizada');
        this.getInscripciones();
        this.visible_put = false;
      },
      error: () => {
        this.ErrorToast('Error al actualizar inscripción');
      }
    });
  }

  deleteInscripcion(id_inscripcion: number) {
    this.inscripcionService.delete(APIENDPOINT.Inscripciones, id_inscripcion).subscribe({
      next: () => {
        this.SuccessToast('Inscripción eliminada');
        this.getInscripciones();
      },
      error: () => {
        this.ErrorToast('Error al eliminar inscripción');
      }
    });
  }

  filtrarGlobal(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dt.filterGlobal(input.value, 'contains');
  }

  clear(table: any) {
    table.clear();
  }

  SuccessToast(detail: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail
    });
  }

  ErrorToast(detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail
    });
  }
}
