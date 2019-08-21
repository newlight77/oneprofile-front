import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';
import { MaterialModule} from '../shared/material.module';
import { GuidesRoutingModule } from './guides-routing.module';
import { GuidesPageComponent } from './guides-page/guides-page.component';
import { GuidesMarkdownPageComponent } from './guides-markdown-page/guides-markdown-page.component';



@NgModule({
  declarations: [
  GuidesPageComponent,
  GuidesMarkdownPageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    GuidesRoutingModule
  ]
})
export class GuidesModule { }
