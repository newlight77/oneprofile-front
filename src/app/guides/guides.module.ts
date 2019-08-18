import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';
import { MaterialModule} from '../shared/material.module';
import { GuidesRoutingModule } from './guides-routing.module';
import { GuidesPageComponent } from './guides-page/guides-page.component';
import { GuidesDeveloperPageComponent } from './guides-developer-page/guides-developer-page.component';
import { GuidesGitflowPageComponent } from './guides-gitflow-page/guides-gitflow-page.component';
import { GuidesDevopsPageComponent } from './guides-devops-page/guides-devops-page.component';
import { GuidesAngularPageComponent } from './guides-angular-page/guides-angular-page.component';
import { GuidesJavaPageComponent } from './guides-java-page/guides-java-page.component';



@NgModule({
  declarations: [
  GuidesPageComponent,
  GuidesDeveloperPageComponent,
  GuidesGitflowPageComponent,
  GuidesDevopsPageComponent,
  GuidesAngularPageComponent,
  GuidesJavaPageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    GuidesRoutingModule
  ]
})
export class GuidesModule { }
