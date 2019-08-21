import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarkdownComponent } from '../shared/markdown/markdown.component';
import { KitsPageComponent } from './kits-page/kits-page.component';

export const routes: Routes = [
  { path: '', component: KitsPageComponent,
    children: [
      { path: '', redirectTo: 'developer', pathMatch: 'full' },
      { path: 'developer', component: MarkdownComponent, data: { markdown: 'kits/developer' } },
      { path: 'ci', component: MarkdownComponent, data: { markdown: 'kits/ci' } },
      { path: 'cd', component: MarkdownComponent, data: { markdown: 'kits/cd' } },
      { path: 'java', component: MarkdownComponent, data: { markdown: 'kits/java' } },
      { path: 'angular', component: MarkdownComponent, data: { markdown: 'kits/angular' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KitsRoutingModule { }
