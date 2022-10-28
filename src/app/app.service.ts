import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Options } from './Params';
import { ICrearVuelo, IEditarVuelo, IResponse } from './res.interface';

@Injectable({
  providedIn: 'root',
})
export class Services {
  private BASE_URL: string = environment.BASE_API + '/vuelos';
  constructor(private http: HttpClient) {}
  getVuelos(): Observable<IResponse[]> {
    return this.http.get<IResponse[]>(this.BASE_URL);
  }
  getVuelosById(idVuelo: any): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.BASE_URL}/${idVuelo}`);
  }
  postVuelo(data: ICrearVuelo): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.BASE_URL}/crear-vuelo`, data);
  }

  putVuelo(data: IEditarVuelo): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.BASE_URL}/actualizar-vuelo`, data);
  }

  deleteVuelo(idVuelo: any): Observable<boolean> {
    return this.http.delete<boolean>(
      `${this.BASE_URL}/eliminar-vuelo/${idVuelo}`
    );
  }
}
