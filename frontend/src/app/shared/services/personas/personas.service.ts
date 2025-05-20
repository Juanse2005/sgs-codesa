import { Injectable } from '@angular/core';
import { BaseService } from '../_base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { personas } from '../../models/personas/personas';
import { MaestroPersonasModel } from '../../models/personas/maestro-personas';

@Injectable()
export class PersonasService extends BaseService<personas, MaestroPersonasModel> {

    private apiurl: string;
    constructor(protected http: HttpClient) {
        super(http, environment.apiURL);
        this.apiurl = environment.apiURL;
    }
};
