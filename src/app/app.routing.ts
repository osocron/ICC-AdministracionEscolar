import { Routes, RouterModule } from '@angular/router';

import {MainComponent} from './main/main.component';
import {InsightComponent} from './main/insights/insight/insight.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent},
  {path: '911', component: InsightComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
