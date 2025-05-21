export interface Curso {
  id_curso:      number;
  nombre_curso:        string;
  descripcion:   string;
  creditos:      number;
  id_profesor:   number;
  especialidad:  string;
  fecha_contratacion: string;
  nombre_persona: string | null;
  apellido:      string;
  email:         string;
  telefono:      string;
  fecha_nacimiento: string; 
}
