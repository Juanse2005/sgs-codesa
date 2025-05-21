import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PaginatedResponse } from '../models/pagination/paginated-response';

export abstract class BaseService<TModel, TMasterModel> {
    public headers = new HttpHeaders();

    constructor(protected _httpClient: HttpClient, protected apiURL = environment.apiURL) { }

    get(endpoint: string): Observable<PaginatedResponse <TModel>> {
        return this._httpClient.get<PaginatedResponse <TModel>>(`${this.apiURL}/${endpoint}`, { headers: this.headers });
    }
    getById(endpoint: string, id: string | number): Observable<TModel> {
        return this._httpClient.get<TModel>(`${this.apiURL}/${endpoint}/${id}`, { headers: this.headers });
    }
    post(endpoint: string, data: any): Observable<TModel> {
        return this._httpClient.post<TModel>(`${this.apiURL}/${endpoint}`, data, { headers: this.headers });
    }
    put(endpoint: string, id: string | number, data: any): Observable<TModel> {
        return this._httpClient.put<TModel>(`${this.apiURL}/${endpoint}/${id}`, data, { headers: this.headers });
    }
    delete(endpoint: string, id: string | number): Observable<TModel> {
        return this._httpClient.delete<TModel>(`${this.apiURL}/${endpoint}/${id}`, { headers: this.headers });
    }
}