import { Component, Input, OnInit } from '@angular/core';
import {Ciclos, Programas, Cursos} from '../../_models/index';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {

  @Input() selectedCiclo: Ciclos;
  @Input() selectedPrograma: Programas;
  @Input() selectedCurso: Cursos;

  constructor() { }

  ngOnInit() {
  }

  generateEstadisticas() {
    console.log('Generando estadisticas');
  }

}
