import { Personas } from "../personas/personas";

export interface Administrativo extends Personas{
    cargo: string;
    departamento: string;
}