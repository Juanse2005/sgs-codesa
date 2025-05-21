import { Personas } from "../personas/personas";

export interface Profesor extends Personas{
    especialidad: string;
    fecha_contratacion: string;
}