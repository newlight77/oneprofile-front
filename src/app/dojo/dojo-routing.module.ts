import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarkdownComponent } from '../shared/markdown/markdown.component';
import { DojoPageComponent } from './dojo-page/dojo-page.component';
import { StatementsPageComponent } from './statements-page/statements-page.component';

export const routes: Routes = [
  { path: '', component: DojoPageComponent,
    children: [
      { path: '', redirectTo: 'guide', pathMatch: 'full' },
      { path: 'dojo', component: MarkdownComponent, data: { markdown: 'dojo/dojo' } },
      { path: 'statements', component: StatementsPageComponent, data: { markdown: 'dojo/statements' } },
      { path: 'statements/:statement', component: MarkdownComponent, data: { markdown: 'dojo/statements/' } },
      { path: 'bootstraps', component: MarkdownComponent, data: { markdown: 'dojo/bootstraps' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DojoRoutingModule { }
