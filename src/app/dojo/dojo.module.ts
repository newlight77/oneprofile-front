import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';
import { MaterialModule} from '../shared/material.module';

import { DojoRoutingModule } from './dojo-routing.module';
import { DojoPageComponent } from './dojo-page/dojo-page.component';
import { StatementsPageComponent } from './statements-page/statements-page.component';


@NgModule({
  declarations: [DojoPageComponent, StatementsPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    DojoRoutingModule
  ]
})
export class DojoModule { }
