import { Component, ViewChild } from '@angular/core';
import { PersonasService } from '../../shared/services/personas/personas.service';
import { APIENDPOINT } from '../../config/configuration';
import { Personas } from '../../shared/models/personas/personas';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrl: './personas.component.css'
})
export class PersonasComponent {
  @ViewChild('dt') dt!: Table;

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

  constructor(private readonly personasService: PersonasService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAllPersonas();
  }
  getAllPersonas() {
    this.personasService.get(APIENDPOINT.Personas).subscribe({
      next: (response) => {
        this.personas = response.content;
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

  selectPersonas(id_persona: number) {
    this.personasService.getById(APIENDPOINT.Personas, id_persona).subscribe({
      next: (res) => {
        this.SuccessToast("Persona Seleccionada correctamente")
        this.selectedPersona = res;
        this.visible_put = true;
        this.loading = false;
      },
      error: (err) => {
        this.ErrorToast("Error al obtener persona")
        this.loading = false;
      }
    });
  }

  putPersonas(id_persona: number) {
    this.personasService.put(APIENDPOINT.Personas, id_persona, this.selectedPersona).subscribe({
      next: (res) => {
        this.SuccessToast("Persona editada correctamente")
        this.getAllPersonas();
        this.visible_put = false;
      },
      error: (err) => {
        this.ErrorToast("Error al editar persona")
      }
    });
  }

  postPersonas() {
    this.personasService.post(APIENDPOINT.Personas, this.personas_form).subscribe({
      next: (res) => {
        this.SuccessToast("Persona creada correctamente")
        this.getAllPersonas();
        this.visible_post = false;
      },
      error: (err) => {
        this.ErrorToast("Error al crear persona")
      }
    });
  }

  deletePersonas(id_persona: number) {
    this.personasService.delete(APIENDPOINT.Personas, id_persona).subscribe({
      next: (res) => {
        this.SuccessToast("Persona eliminada correctamente")
        this.getAllPersonas();
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

