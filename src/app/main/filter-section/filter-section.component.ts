import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Ciclos, Programas, Cursos} from '../../_models/index';
import {RemoteAPIService} from '../../_services/index';

@Component({
  selector: 'app-filter-section',
  templateUrl: './filter-section.component.html',
  styleUrls: ['./filter-section.component.css']
})
export class FilterSectionComponent implements OnInit {
  remote_ciclos: Subject<Ciclos[]>;
  remote_programas: Subject<Programas[]>;
  remote_cursos: Subject<Cursos[]>;
  selected_programa: Programas;
  selected_ciclo: Ciclos;
  selected_curso: Cursos;

  constructor(
    private remoteService: RemoteAPIService) { }

  ngOnInit() {
    this.remote_ciclos = new Subject();
    this.remote_programas = new Subject();
    this.remote_cursos = new Subject();
  }

  onCiclosComboQuery(query) {
    if (query) {
      this.remoteService.searchCiclos(query).subscribe((result) => {
        this.remote_ciclos.next(result);
      });
    } else {
      this.remoteService.getCiclos().subscribe((result) => {
        this.remote_ciclos.next(result);
      });
    }
  }

  onCiclosComboSelect(ciclo: Ciclos) {
    this.selected_ciclo = ciclo;
    console.log(ciclo);
  }

  onProgramasComboQuery(query) {
    if (query) {
      this.remoteService.searchProgramas(query).subscribe((result) => {
        this.remote_programas.next(result);
      });
    } else {
      this.remoteService.getProgramas().subscribe((result) => {
        this.remote_programas.next(result);
      });
    }
  }

  onProgramasComboSelect(programa: Programas) {
    this.selected_programa = programa;
    this.selected_curso = null;
    console.log(programa);
  }

  onCursosComboQuery(query) {
    if (query) {
      if (this.selected_programa) {
        this.remoteService.searchCursos(this.selected_programa, query).subscribe((result) => {
          this.remote_cursos.next(result);
        });
      } else {
        // No programa selected
        this.remote_cursos.next([]);
      }
    } else {
      if (this.selected_programa) {
        this.remoteService.getCursos(this.selected_programa).subscribe((result) => {
          this.remote_cursos.next(result);
        });
      } else {
        // No programa selected
        this.remote_cursos.next([]);
      }
    }
  }

  onCursosComboSelect(curso: Cursos) {
    console.log(curso);
    this.selected_curso = curso;
  }

  onGenerateEstadistica() {
    // TODO implementar la generacion de estadisticas
  }

}
