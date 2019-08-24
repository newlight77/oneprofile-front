import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../shared/shared.module';
import { MaterialModule} from '../shared/material.module';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { BlogArticlesPageComponent } from './blog-articles-page/blog-articles-page.component';


@NgModule({
  declarations: [BlogPageComponent, BlogArticlesPageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }
