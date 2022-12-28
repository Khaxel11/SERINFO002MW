import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectorioRoutingModule } from './serinfo002mw-routing.module';
import { DirectorioComponent } from './pages/directorio/serinfo002mw.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DirectorioComponent],
  imports: [
    CommonModule,
    DirectorioRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class DirectorioModule { }
