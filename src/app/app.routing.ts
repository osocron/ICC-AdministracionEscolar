import { Routes, RouterModule } from '@angular/router';

import {MainComponent} from './main/main.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
