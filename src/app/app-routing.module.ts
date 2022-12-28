import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './shared/components/auth/auth.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  // {  path: 'auth/:module/:component/:user/:zone', component: AuthComponent },
  // {  path: 'auth/:module/:user/:zone', component: AuthComponent },
  {
    path: 'auth/:module/:component',
    component: AuthComponent
  },
  {
    path: 'auth/:module',
    component: AuthComponent
  },
  
  {
    path: 'serinfo002mw',
    loadChildren: () => import('./modules/serinfo002mw/serinfo002mw.module').then(m => m.DirectorioModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'serinfo002mw/usuarios',
    loadChildren: () => import('./modules/serinfo002mw/serinfo002mw.module').then(m => m.DirectorioModule),
    //canActivate: [AuthGuard]
  }


  /*{
    path: 'ejecutivos',
    loadChildren: () => import('./modules/ejecutivos/ejecutivos.module').then(m => m.EjecutivosModule),
    canActivate: [AuthGuard]
  },*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
