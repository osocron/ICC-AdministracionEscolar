import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Ciclos, Programas, Cursos} from '../_models/index';

@Injectable()
export class RemoteAPIService {
  base_url = 'http://localhost:9000/';

  constructor(private http: Http) {
  }

  getCiclos(): Observable<Ciclos[]> {
    return this.http
      .get(this.base_url + 'ciclos')
      .map((r: Response) => r.json() as Ciclos[])
      .catch((error: any) => {
        console.error('An friendly error occurred', error);
        return Observable.throw(error.message || error);
      });
  }

  searchCiclos(query: string): Observable<Ciclos[]> {
    return this.http
      .get(this.base_url + 'ciclos/like/' + query)
      .map((r: Response) => r.json() as Ciclos[])
      .catch((error: any) => {
        console.error('An friendly error occurred', error);
        return Observable.throw(error.message || error);
      });
  }

  getProgramas(): Observable<Programas[]> {
    return this.http
      .get(this.base_url + 'programas')
      .map((r: Response) => r.json() as Programas[])
      .catch((error: any) => {
        console.error('An friendly error occurred', error);
        return Observable.throw(error.message || error);
      });
  }

  searchProgramas(query: String): Observable<Programas[]> {
    return this.http
      .get(this.base_url + 'programas/like/' + query)
      .map((r: Response) => r.json() as Programas[])
      .catch((error: any) => {
        console.error('An friendly error occurred', error);
        return Observable.throw(error.message || error);
      });
  }

  getCursos(programa: Programas): Observable<Cursos[]> {
    return this.http
      .get(this.base_url + 'cursos/' + programa.nombre)
      .map((r: Response) => r.json() as Cursos[])
      .catch((error: any) => {
        console.error('An friendly error occurred', error);
        return Observable.throw(error.message || error);
      });
  }

  searchCursos(programa: Programas, query: String): Observable<Cursos[]> {
    return this.http
      .get(this.base_url + 'cursos/' + programa.nombre + '/like/' + query)
      .map((r: Response) => r.json() as Cursos[])
      .catch((error: any) => {
        console.error('An friendly error occurred', error);
        return Observable.throw(error.message || error);
      });
  }
}
