import { Personas } from "../personas/personas";

export interface Estudiante extends Personas {
  numero_matricula: string;
  grado: string;
}