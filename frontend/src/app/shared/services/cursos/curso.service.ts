import { Injectable } from '@angular/core';
import { BaseService } from '../_base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { MaestroPersonasModel } from '../../models/personas/maestro-personas';
import { Curso } from '../../models/curso/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends BaseService<Curso, MaestroPersonasModel> {

    private apiurl: string;
    constructor(protected http: HttpClient) {
        super(http, environment.apiURL);
        this.apiurl = environment.apiURL;
    }
};
