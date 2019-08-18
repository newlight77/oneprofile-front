import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuidesPageComponent } from './guides-page/guides-page.component';
import { GuidesDeveloperPageComponent } from './guides-developer-page/guides-developer-page.component';
import { GuidesGitflowPageComponent } from './guides-gitflow-page/guides-gitflow-page.component';
import { GuidesDevopsPageComponent } from './guides-devops-page/guides-devops-page.component';
import { GuidesAngularPageComponent } from './guides-angular-page/guides-angular-page.component';
import { GuidesJavaPageComponent } from './guides-java-page/guides-java-page.component';


export const routes: Routes = [
  { path: '', component: GuidesPageComponent,
    children: [
      { path: '', redirectTo: 'developer', pathMatch: 'full' },
      { path: 'developer', component: GuidesDeveloperPageComponent, pathMatch: 'full' },
      { path: 'gitlfow', component: GuidesDevopsPageComponent, pathMatch: 'full' },
      { path: 'devops', component: GuidesGitflowPageComponent, pathMatch: 'full' },
      { path: 'java', component: GuidesAngularPageComponent, pathMatch: 'full' },
      { path: 'angular', component: GuidesJavaPageComponent, pathMatch: 'full' },
      { path: '**', redirectTo: 'developer' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuidesRoutingModule { }
