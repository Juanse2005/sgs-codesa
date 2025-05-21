import { Injectable } from '@angular/core';
import { BaseService } from '../_base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Personas } from '../../models/personas/personas';
import { MaestroPersonasModel } from '../../models/personas/maestro-personas';

@Injectable({
  providedIn: 'root'
})
export class PersonasService extends BaseService<Personas, MaestroPersonasModel> {

    private apiurl: string;
    constructor(protected http: HttpClient) {
        super(http, environment.apiURL);
        this.apiurl = environment.apiURL;
    }
};
