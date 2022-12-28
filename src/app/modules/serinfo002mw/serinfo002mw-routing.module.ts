import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectorioComponent } from './pages/directorio/serinfo002mw.component';

const routes: Routes = [
  { path: 'serinfo002mw', component: DirectorioComponent },
  { path: 'usuarios'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectorioRoutingModule { }
