import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PaginatedResponse } from '../models/pagination/paginated-response';

/**
 * Clase baseService para la comunicación con APIs REST.
 *
 * Proporciona métodos comunes para realizar operaciones CRUD
 * (crear, leer, actualizar, eliminar) y soporta paginación.
 *
 * @typeParam TModel - Tipo del modelo principal.
 * @typeParam TMasterModel - Tipo del modelo maestro.
 */

export abstract class BaseService<TModel, TMasterModel> {
  public headers = new HttpHeaders();

  /** Constructor de la clase BaseService
   * @param _httpClient Cliente HTTP para realizar solicitudes.
   * @param apiURL URL base (Environment) de la API.
   */

  constructor(
    protected _httpClient: HttpClient,
    protected apiURL = environment.apiURL
  ) {}

  /**
   * Obtiene todos los registros por paginacion y si aplica Qry parameter.
   * @param endpoint - Endpoint de la API.
   * @returns Observable con la lista completa de registros.
   */
  getPaginated(
    endpoint: string,
    page: number,
    size: number,
    extraParams?: { [key: string]: any }
  ): Observable<PaginatedResponse<TModel>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (extraParams) {
      Object.keys(extraParams).forEach((key) => {
        params = params.set(key, extraParams[key]);
      });
    }

    return this._httpClient.get<PaginatedResponse<TModel>>(
      `${this.apiURL}/${endpoint}`,
      { headers: this.headers, params }
    );
  }

  /**
   * Obtiene todos los registros de un endpoint.
   * @param endpoint - Endpoint de la API.
   * @returns Observable con la lista completa de registros.
   */
  get(endpoint: string): Observable<PaginatedResponse<TModel>> {
    return this._httpClient.get<PaginatedResponse<TModel>>(
      `${this.apiURL}/${endpoint}`,
      { headers: this.headers }
    );
  }

  /**
   * Obtiene un registro por su ID.
   *
   * @param endpoint - Endpoint de la API.
   * @param id - Identificador del registro.
   * @returns Observable con el modelo encontrado.
   */
  getById(endpoint: string, id: string | number): Observable<TModel> {
    return this._httpClient.get<TModel>(`${this.apiURL}/${endpoint}/${id}`, {
      headers: this.headers,
    });
  }

  /**
   * Obtiene el total de registros actuales.
   *
   * @param endpoint - Endpoint de la API.
   * @returns Observable con el total de registros.
   */
  getTotal(endpoint: string): Observable<{ total: number }> {
    return this._httpClient.get<{ total: number }>(
      `${this.apiURL}/${endpoint}`,
      { headers: this.headers }
    );
  }

  /**
   * Crea un nuevo registro.
   *
   * @param endpoint - Endpoint de la API.
   * @param data - Datos del nuevo registro.
   * @returns Observable con el registro creado.
   */
  post(endpoint: string, data: any): Observable<TModel> {
    return this._httpClient.post<TModel>(`${this.apiURL}/${endpoint}`, data, {
      headers: this.headers,
    });
  }

  /**
   * Actualiza un registro existente.
   *
   * @param endpoint - Endpoint de la API.
   * @param id - Identificador del registro a actualizar.
   * @param data - Datos actualizados.
   * @returns Observable con el registro actualizado.
   */
  put(endpoint: string, id: string | number, data: any): Observable<TModel> {
    return this._httpClient.put<TModel>(
      `${this.apiURL}/${endpoint}/${id}`,
      data,
      { headers: this.headers }
    );
  }

  /**
   * Elimina un registro por su ID.
   *
   * @param endpoint - Endpoint de la API.
   * @param id - Identificador del registro a eliminar.
   * @returns Observable con la respuesta del servidor.
   */
  delete(endpoint: string, id: string | number): Observable<TModel> {
    return this._httpClient.delete<TModel>(`${this.apiURL}/${endpoint}/${id}`, {
      headers: this.headers,
    });
  }
}
