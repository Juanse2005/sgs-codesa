import { Component, ViewChild } from '@angular/core';
import { APIENDPOINT } from '../../config/configuration';
import { MessageService } from 'primeng/api';
import { ProfesorService } from '../../shared/services/profesores/profesor.service';
import { Personas } from '../../shared/models/personas/personas';
import { Table } from 'primeng/table';
import { Profesor } from '../../shared/models/profesores/personas';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrl: './profesores.component.css'
})
export class ProfesoresComponent {
    @ViewChild('dt') dt!: Table;
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
  
    constructor(private readonly profesorService: ProfesorService, private messageService: MessageService) { }
  
    ngOnInit(): void {
      this.getAllPersonas();
      this.getAllProfesor();
    }
    onPersonaChange(id: number) {
      const persona = this.personas.find(p => p.id_persona === +id);
      if (persona) {
        this.selectedPersona = persona;
        this.profesor_form = {
          ...persona,
          especialidad: '',
          fecha_contratacion: ''
        };
      }
    }
  
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
  
    getAllProfesor() {
      this.profesorService.get(APIENDPOINT.Profesor).subscribe({
        next: (response) => {
          this.profesor = response.content;
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
  
    selectProfesor(id_persona: number) {
      this.profesorService.getById(APIENDPOINT.Profesor, id_persona).subscribe({
        next: (res) => {
          this.SuccessToast("Persona Seleccionada correctamente")
          this.selectedProfesor = res;
          this.visible_put = true;
          this.loading = false;
        },
        error: (err) => {
          this.ErrorToast("Error al obtener persona")
          this.loading = false;
        }
      });
    }
  
    putProfesor(id_persona: number) {
      this.profesorService.put(APIENDPOINT.Profesor, id_persona, this.selectedProfesor).subscribe({
        next: (res) => {
          this.SuccessToast("Persona editada correctamente")
          this.getAllProfesor();
          this.visible_put = false;
        },
        error: (err) => {
          this.ErrorToast("Error al editar persona")
        }
      });
    }
  
    postprofesor() {
        console.log(this.profesor_form); 
  
      this.profesorService.post(APIENDPOINT.Profesor, this.profesor_form).subscribe({
        next: (res) => {
          this.SuccessToast("Persona creada correctamente")
          this.getAllProfesor();
          this.visible_post = false;
        },
        error: (err) => {
          this.ErrorToast("Error al crear persona")
        }
      });
    }
  
    deleteprofesor(id_persona: number) {
      this.profesorService.delete(APIENDPOINT.Profesor, id_persona).subscribe({
        next: (res) => {
          this.SuccessToast("Persona eliminada correctamente")
          this.getAllProfesor();
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
}