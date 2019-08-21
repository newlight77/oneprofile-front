import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { MarkdownComponent } from './markdown/markdown.component';


@NgModule({
  declarations: [ MarkdownComponent ],
  imports: [
    CommonModule,
    MarkdownModule.forChild()
  ],
  exports: [
    MarkdownModule,
    MarkdownComponent
  ]
})
export class SharedModule { }
