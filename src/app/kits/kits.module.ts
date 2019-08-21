import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';
import { MaterialModule} from '../shared/material.module';

import { KitsRoutingModule } from './kits-routing.module';
import { KitsPageComponent } from '../kits/kits-page/kits-page.component';


@NgModule({
  declarations: [
    KitsPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    KitsRoutingModule
  ]
})
export class KitsModule { }
