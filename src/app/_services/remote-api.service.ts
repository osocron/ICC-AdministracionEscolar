import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response, URLSearchParams} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Ciclos, Programas, Cursos, Resultado} from '../_models/index';

@Injectable()
export class RemoteAPIService {
  base_url = 'http://10.200.3.210:9000/';

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

  getAll(): Observable<Resultado> {
    return this.http
      .get(this.base_url + 'estadisticas/all')
      .map((r: Response) => r.json() as Resultado)
      .catch((error: any) => {
        console.error('An friendly error occurred', error);
        return Observable.throw(error.message || error);
      });
  }

  getByPrograma(programa: Programas): Observable<Resultado> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('programa', programa.nombre);
    return this.http
      .post(this.base_url + 'estadisticas/programa', urlSearchParams)
      .map((r: Response) => r.json() as Resultado)
      .catch((error: any) => {
        console.error('An friendly error occurred', error);
        return Observable.throw(error.message || error);
      });
  }

  getByProgramaCurso(programa: Programas, curso: Cursos): Observable<Resultado> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('programa', programa.nombre);
    urlSearchParams.append('curso', curso.nombre);
    return this.http
      .post(this.base_url + 'estadisticas/programaCurso', urlSearchParams)
      .map((r: Response) => r.json() as Resultado)
      .catch((error: any) => {
        console.error('An friendly error occurred', error);
        return Observable.throw(error.message || error);
      });
  }

  getByPeriodo(ciclo: Ciclos): Observable<Resultado> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('periodo', ciclo.periodo);
    return this.http
      .post(this.base_url + 'estadisticas/periodo', urlSearchParams)
      .map((r: Response) => r.json() as Resultado)
      .catch((error: any) => {
        console.error('An friendly error occurred', error);
        return Observable.throw(error.message || error);
      });
  }

  getByPeriodoPrograma(ciclo: Ciclos, programa: Programas): Observable<Resultado> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('periodo', ciclo.periodo);
    urlSearchParams.append('programa', programa.nombre);
    return this.http
      .post(this.base_url + 'estadisticas/periodoPrograma', urlSearchParams)
      .map((r: Response) => r.json() as Resultado)
      .catch((error: any) => {
        console.error('An friendly error occurred', error);
        return Observable.throw(error.message || error);
      });
  }

  getByPeriodoProgramaCurso(ciclo: Ciclos, programa: Programas, curso: Cursos): Observable<Resultado> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('periodo', ciclo.periodo);
    urlSearchParams.append('programa', programa.nombre);
    urlSearchParams.append('curso', curso.nombre);
    return this.http
      .post(this.base_url + 'estadisticas/periodoProgramaCurso', urlSearchParams)
      .map((r: Response) => r.json() as Resultado)
      .catch((error: any) => {
        console.error('An friendly error occurred', error);
        return Observable.throw(error.message || error);
      });
  }
}
