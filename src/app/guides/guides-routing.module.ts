import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuidesPageComponent } from './guides-page/guides-page.component';
import { GuidesMarkdownPageComponent } from './guides-markdown-page/guides-markdown-page.component';


export const routes: Routes = [
  { path: '', component: GuidesPageComponent,
    children: [
      { path: '', redirectTo: 'developer', pathMatch: 'full' },
      { path: 'developer', component: GuidesMarkdownPageComponent, data: {markdown: 'developer'} },
      { path: 'devops', component: GuidesMarkdownPageComponent, data: {markdown: 'devops'} },
      { path: 'gitflow', component: GuidesMarkdownPageComponent, data: {markdown: 'gitflow'} },
      { path: 'angular', component: GuidesMarkdownPageComponent, data: {markdown: 'angular'} },
      { path: 'java', component: GuidesMarkdownPageComponent, data: {markdown: 'java'} },
      // { path: '**', redirectTo: 'developer' }
    ],
    runGuardsAndResolvers: 'paramsChange',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuidesRoutingModule { }
