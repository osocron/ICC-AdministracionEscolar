import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  estadisticasClicked = true;
  formulariosClicked = false;

  onEstadisticasClicked() {
    this.estadisticasClicked = true;
    this.formulariosClicked = false;
  }

  onFormularioClicked() {
    this.formulariosClicked = true;
    this.estadisticasClicked = false;
  }
}
