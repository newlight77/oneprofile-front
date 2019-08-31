import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarkdownComponent } from '../shared/markdown/markdown.component';
import { DojoPageComponent } from './dojo-page/dojo-page.component';
import { StatementsPageComponent } from './statements-page/statements-page.component';

export const routes: Routes = [
  { path: '', component: DojoPageComponent,
    children: [
      { path: '', redirectTo: 'guide', pathMatch: 'full' },
      { path: 'dojo', component: MarkdownComponent, data: { mdSubDir: 'dojo/', mdFilename: 'dojo' } },
      { path: 'statements', component: StatementsPageComponent, data: { mdSubDir: 'dojo/', mdFilename: 'statements' } },
      { path: 'statements/:mdFilename', component: MarkdownComponent, data: { mdSubDir: 'dojo/statements/' } },
      { path: 'bootstraps', component: MarkdownComponent, data: { mdSubDir: 'dojo/', mdFilename: 'bootstraps' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DojoRoutingModule { }
