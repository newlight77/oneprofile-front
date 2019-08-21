import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuidesPageComponent } from './guides-page/guides-page.component';
import { MarkdownComponent } from '../shared/markdown/markdown.component';


export const routes: Routes = [
  { path: '', component: GuidesPageComponent,
    children: [
      { path: '', redirectTo: 'developer', pathMatch: 'full' },
      { path: 'developer', component: MarkdownComponent, data: {markdown: 'guides/developer'} },
      { path: 'devops', component: MarkdownComponent, data: {markdown: 'guides/devops'} },
      { path: 'gitflow', component: MarkdownComponent, data: {markdown: 'guides/gitflow'} },
      { path: 'angular', component: MarkdownComponent, data: {markdown: 'guides/angular'} },
      { path: 'java', component: MarkdownComponent, data: {markdown: 'guides/java'} },
    ],
    runGuardsAndResolvers: 'paramsChange',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuidesRoutingModule { }
