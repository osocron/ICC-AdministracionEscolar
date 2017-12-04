import { Component, Input, OnInit } from '@angular/core';
import {Ciclos, Programas, Cursos, Registro, Resultado} from '../../_models/index';
import {RemoteAPIService} from '../../_services/remote-api.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {

  @Input() selectedCiclo: Ciclos;
  @Input() selectedCicloAnterior: Ciclos;
  @Input() selectedPrograma: Programas;
  @Input() selectedCurso: Cursos;

  numeroAprobados = 0;
  numeroReprobados = 0;
  totalAlumnos = 0;
  porcentajeAprobacion = '0';
  totalAlumnosCicloActual = 0;
  totalAlumnosCicloAnterior = 0;
  numeroReinscripciones = 0;
  porcentajeRetencion = '0';

  public loading = false;

  constructor(
    private remoteService: RemoteAPIService) { }

  ngOnInit() {
  }

  generateEstadisticas() {
    this.loading = true;
    console.log('Generando estadisticas');
    if (this.selectedCiclo && this.selectedPrograma && this.selectedCurso) {
      const first = this.remoteService
        .getByPeriodoProgramaCurso(this.selectedCiclo, this.selectedPrograma, this.selectedCurso);
      if (this.selectedCicloAnterior) {
        const second = this.remoteService
          .getByPeriodoProgramaCurso(this.selectedCicloAnterior, this.selectedPrograma, this.selectedCurso);
        Observable.forkJoin(first, second).subscribe((result: Resultado[]) => this.estadisticaRetencionAprobacion(result));
      } else {
        first.subscribe((result) => this.estadisticaAprobacion(result));
      }
    } else if (!this.selectedCurso && this.selectedCiclo && this.selectedPrograma) {
      const first = this.remoteService
        .getByPeriodoPrograma(this.selectedCiclo, this.selectedPrograma);
      if (this.selectedCicloAnterior) {
        const second = this.remoteService
          .getByPeriodoPrograma(this.selectedCicloAnterior, this.selectedPrograma);
        Observable.forkJoin(first, second).subscribe((result: Resultado[]) => this.estadisticaRetencionAprobacion(result));
      } else {
        first.subscribe((result) => this.estadisticaAprobacion(result));
      }
    } else if (!this.selectedCurso && !this.selectedPrograma && this.selectedCiclo) {
      const first = this.remoteService
        .getByPeriodo(this.selectedCiclo);
      if (this.selectedCicloAnterior) {
        const second = this.remoteService
          .getByPeriodo(this.selectedCicloAnterior);
        Observable.forkJoin(first, second).subscribe((result: Resultado[]) => this.estadisticaRetencionAprobacion(result));
      } else {
        first.subscribe((result) => this.estadisticaAprobacion(result));
      }
    } else if (!this.selectedCiclo && this.selectedPrograma && this.selectedCurso) {
      this.remoteService
        .getByProgramaCurso(this.selectedPrograma, this.selectedCurso)
        .subscribe((result) => this.estadisticaAprobacion(result));
    } else if (!this.selectedCiclo && this.selectedPrograma && !this.selectedCurso) {
      this.remoteService
        .getByPrograma(this.selectedPrograma)
        .subscribe((result) => this.estadisticaAprobacion(result));
    } else {
      this.remoteService
        .getAll()
        .subscribe((result) => this.estadisticaAprobacion(result));
    }
  }

  logResult(result) {
    if (result.error) {
      console.log(result.value);
      this.loading = false;
    } else {
      console.log(result.value);
      this.loading = false;
    }
  }

  estadisticaAprobacion(result) {
    if (!result.error) {
      const values: Registro[] = result.value;
      const total = values.length;
      const aprobados = values.reduce((n, resultado) => {
        if (resultado.calif === '-' || resultado.calif === 'BD' ||
          resultado.calif === 'BM' || resultado.calif === 'BT' ||
          resultado.calif === 'DA' || resultado.calif === 'IN' ||
          resultado.calif === 'NA' || resultado.calif === 'NO PRESENT' ||
          resultado.calif === 'NP' || resultado.calif === 'PRESENTÓ E' ||
          resultado.calif === 'REV' || resultado.calif === 'S/C') {
          return n;
        } else if (resultado.calif === 'A') {
          return n + 1;
        } else {
          if (+resultado.calif >= 6) {
            return n + 1;
          } else {
            return n;
          }
        }
      }, 0);
      this.numeroAprobados = aprobados;
      this.numeroReprobados = total - aprobados;
      this.totalAlumnos = total;
      this.totalAlumnosCicloActual = 0;
      this.totalAlumnosCicloAnterior = 0;
      this.numeroReinscripciones = 0;
      this.porcentajeRetencion = '0';
      if (aprobados && total) {
        this.porcentajeAprobacion = ((aprobados * 100) / total).toFixed(2);
      } else {
        this.porcentajeAprobacion = '0';
      }
      this.loading = false;
    } else {
      this.loading = false;
    }
  }

  estadisticaRetencionAprobacion(result: Resultado[]) {
    if (!result[0].error && !result[1].error) {
      const valoresActuales: Registro[] = result[0].value;
      const totalActual = valoresActuales.length;
      const aprobados = valoresActuales.reduce((n, resultado) => {
        if (resultado.calif === '-' || resultado.calif === 'BD' ||
          resultado.calif === 'BM' || resultado.calif === 'BT' ||
          resultado.calif === 'DA' || resultado.calif === 'IN' ||
          resultado.calif === 'NA' || resultado.calif === 'NO PRESENT' ||
          resultado.calif === 'NP' || resultado.calif === 'PRESENTÓ E' ||
          resultado.calif === 'REV' || resultado.calif === 'S/C') {
          return n;
        } else if (resultado.calif === 'A') {
          return n + 1;
        } else {
          if (+resultado.calif >= 6) {
            return n + 1;
          } else {
            return n;
          }
        }
      }, 0);
      // Object with variable properties whose name are the matricula
      const inscritosActualesAgrupados = this.groupBy(result[0].value, 'matricula');
      const inscritosAnterioresAgrupados = this.groupBy(result[1].value, 'matricula');
      let reinscritos = 0;
      let totalInscritosAnterior = 0;
      let totalInscritosActual = 0;
      for (const matriculaActual in inscritosActualesAgrupados) {
        if (inscritosActualesAgrupados.hasOwnProperty(matriculaActual)) {
          totalInscritosActual = totalInscritosActual + 1;
        }
      }
      for (const matriculaAnterior in inscritosAnterioresAgrupados) {
        if (inscritosAnterioresAgrupados.hasOwnProperty(matriculaAnterior)) {
          for (const matriculaActual in inscritosActualesAgrupados) {
            if (inscritosActualesAgrupados.hasOwnProperty(matriculaActual)) {
              if (matriculaAnterior === matriculaActual) {
                reinscritos = reinscritos + 1;
              }
            }
          }
          totalInscritosAnterior = totalInscritosAnterior + 1;
        }
      }
      this.numeroAprobados = aprobados;
      this.numeroReprobados = totalActual - aprobados;
      this.totalAlumnos = totalActual;
      if (aprobados && totalActual) {
        this.porcentajeAprobacion = ((aprobados * 100) / totalActual).toFixed(2);
      } else {
        this.porcentajeAprobacion = '0';
      }
      this.totalAlumnosCicloActual = totalInscritosActual;
      this.totalAlumnosCicloAnterior = totalInscritosAnterior;
      this.numeroReinscripciones = reinscritos;
      if (reinscritos && totalInscritosAnterior) {
        this.porcentajeRetencion = ((reinscritos * 100) / totalInscritosAnterior).toFixed(2);
      } else {
        this.porcentajeRetencion = '0';
      }
      this.loading = false;
    } else {
      this.loading = false;
    }
  }

  groupBy(array, prop) {
    return array.reduce(function(groups, item) {
      const val = item[prop];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  }

}
