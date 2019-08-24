import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { BlogArticlesPageComponent } from './blog-articles-page/blog-articles-page.component';
import { MarkdownComponent } from '../shared/markdown/markdown.component';


export const routes: Routes = [
  { path: '', component: BlogPageComponent,
    children: [
      { path: '', redirectTo: 'blog', pathMatch: 'full' },
      { path: 'blog', component: BlogArticlesPageComponent },
      { path: 'categories/:catogory', component: BlogArticlesPageComponent},
      { path: 'tags/:tag', component: BlogArticlesPageComponent },
      { path: 'search/:searchKeyWord', component: BlogArticlesPageComponent },
      { path: 'articles/:article', component: MarkdownComponent, data: { markdown: 'blog/articles/' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
