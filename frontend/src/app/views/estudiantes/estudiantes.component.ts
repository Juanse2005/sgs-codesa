import { Component, ViewChild } from '@angular/core';
import { Estudiante } from '../../shared/models/estudiante/estudiante';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EstudianteService } from '../../shared/services/estudiante/estudiante.service';
import { APIENDPOINT } from '../../config/configuration';
import { Personas } from '../../shared/models/personas/personas';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css'
})
export class EstudiantesComponent {
  @ViewChild('dt') dt!: Table;


  estudianteSeleccionado: string = '';

  personas: Personas[] = [];

  estudiantes: Estudiante[] = [];

  estudiante_form: Estudiante = {} as Estudiante;
  selectedEstudiante: Estudiante = {} as Estudiante;

  selectedPersonaId!: number;
  selectedPersona!: Personas;  // la persona completa


  loading = true;
  searchValue = '';
  visiblePasswordId: number | null = null;
  showPasswordPost: boolean = false;
  showPasswordPut: boolean = false;
  visible_put: boolean = false;
  visible_post: boolean = false;

  email: string = '';

  constructor(private readonly estudianteService: EstudianteService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getAllpersonas();
    this.getAllestudiantes();
  }
  onPersonaChange(id: number) {
    const persona = this.personas.find(p => p.id_persona === +id);
    if (persona) {
      this.selectedPersona = persona;
      // Inicializo el estudiante_form con todos los datos de Personas:
      this.estudiante_form = {
        ...persona,
        numero_matricula: '',
        grado: ''
      };
    }
  }

  getAllpersonas() {
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

  getAllestudiantes() {
    this.estudianteService.get(APIENDPOINT.Estudiantes).subscribe({
      next: (response) => {
        this.estudiantes = response.content;
        this.loading = false;

      },
      error: (err) => {
        this.loading = false;
      },
    });
  }
  clear(table: any) {
    table.clear();
  }
  filtrarGlobal(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dt.filterGlobal(input.value, 'contains');
  }

  selectestudiante(id_persona: number) {
    this.estudianteService.getById(APIENDPOINT.Estudiantes, id_persona).subscribe({
      next: (res) => {
        this.SuccessToast("Persona Seleccionada correctamente")
        this.selectedEstudiante = res;
        this.visible_put = true;
        this.loading = false;
      },
      error: (err) => {
        this.ErrorToast("Error al obtener persona")
        this.loading = false;
      }
    });
  }

  putestudiante(id_persona: number) {
    this.estudianteService.put(APIENDPOINT.Estudiantes, id_persona, this.selectedEstudiante).subscribe({
      next: (res) => {
        this.SuccessToast("Persona editada correctamente")
        this.getAllestudiantes();
        this.visible_put = false;
      },
      error: (err) => {
        this.ErrorToast("Error al editar persona")
      }
    });
  }

  postestudiante() {
    console.log(this.estudiante_form);

    this.estudianteService.post(APIENDPOINT.Estudiantes, this.estudiante_form).subscribe({
      next: (res) => {
        this.SuccessToast("Persona creada correctamente")
        this.getAllestudiantes();
        this.visible_post = false;
      },
      error: (err) => {
        this.ErrorToast("Error al crear persona")
      }
    });
  }

  deleteestudiante(id_persona: number) {
    this.estudianteService.delete(APIENDPOINT.Estudiantes, id_persona).subscribe({
      next: (res) => {
        this.SuccessToast("Persona eliminada correctamente")
        this.getAllestudiantes();
      },
      error: (err) => {
        this.ErrorToast("Error al eliminar persona")
      }
    });
  }

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

  confirmDelete(id_persona: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este usuario?',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.deleteestudiante(id_persona);
      }
    });
  }

}
