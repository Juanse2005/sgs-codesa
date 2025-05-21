import { Component, ViewChild } from '@angular/core';
import { APIENDPOINT } from '../../config/configuration';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdministrativoService } from '../../shared/services/administrativos/administrativo.service';
import { Personas } from '../../shared/models/personas/personas';
import { Table } from 'primeng/table';
import { Administrativo } from '../../shared/models/administrativo/administrativo';

@Component({
  selector: 'app-administrativos',
  templateUrl: './administrativos.component.html',
  styleUrl: './administrativos.component.css'
})
export class AdministrativosComponent {
  @ViewChild('dt') dt!: Table;
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

  constructor(private readonly administrativoService: AdministrativoService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getAllPersonas();
    this.getAllAdministrativo();
  }
  onPersonaChange(id: number) {
    const persona = this.personas.find(p => p.id_persona === +id);
    if (persona) {
      this.selectedPersona = persona;
      this.administrativo_form = {
        ...persona,
        cargo: '',
        departamento: ''
      };
    }
  }

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

  getAllAdministrativo() {
    this.administrativoService.get(APIENDPOINT.Administrativo).subscribe({
      next: (response) => {
        this.administrativo = response.content;
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

  selectAdministrativo(id_persona: number) {
    this.administrativoService.getById(APIENDPOINT.Administrativo, id_persona).subscribe({
      next: (res) => {
        this.SuccessToast("Persona Seleccionada correctamente")
        this.selectedAdministrativo = res;
        this.visible_put = true;
        this.loading = false;
      },
      error: (err) => {
        this.ErrorToast("Error al obtener persona")
        this.loading = false;
      }
    });
  }

  putAdministrativo(id_persona: number) {
    this.administrativoService.put(APIENDPOINT.Administrativo, id_persona, this.selectedAdministrativo).subscribe({
      next: (res) => {
        this.SuccessToast("Persona editada correctamente")
        this.getAllAdministrativo();
        this.visible_put = false;
      },
      error: (err) => {
        this.ErrorToast("Error al editar persona")
      }
    });
  }

  postAdministrativo() {
    console.log(this.administrativo_form);

    this.administrativoService.post(APIENDPOINT.Administrativo, this.administrativo_form).subscribe({
      next: (res) => {
        this.SuccessToast("Persona creada correctamente")
        this.getAllAdministrativo();
        this.visible_post = false;
      },
      error: (err) => {
        this.ErrorToast("Error al crear persona")
      }
    });
  }

  deleteAdministrativo(id_persona: number) {
    this.administrativoService.delete(APIENDPOINT.Administrativo, id_persona).subscribe({
      next: (res) => {
        this.SuccessToast("Persona eliminada correctamente")
        this.getAllAdministrativo();
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
        this.deleteAdministrativo(id_persona);
      }
    });
  }
}