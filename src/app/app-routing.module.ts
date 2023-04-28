import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreatenoteComponent } from './createnote/createnote.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  { path: 'create', component: CreatenoteComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'modify/:id', component: CreatenoteComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
