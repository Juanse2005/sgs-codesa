import { Injectable } from "@angular/core";
import { BaseService } from "../_base.service";
import { Profesor } from "../../models/profesores/personas";
import { MaestroPersonasModel } from "../../models/personas/maestro-personas";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Inscripcion } from "../../models/inscripcion/inscripcion";

@Injectable({
  providedIn: 'root'
})
export class InscripcionService extends BaseService<Inscripcion, MaestroPersonasModel> {

    private apiurl: string;
    constructor(protected http: HttpClient) {
        super(http, environment.apiURL);
        this.apiurl = environment.apiURL;
    }
};
