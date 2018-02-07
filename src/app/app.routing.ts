import { Routes, RouterModule } from '@angular/router';

import {MainComponent} from './main/main.component';
import {Formulario911Component} from './main/formulario911/formulario911.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent},
  {path: '911', component: Formulario911Component},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
