import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';



@NgModule({
  imports: [
    CommonModule,
    MarkdownModule.forChild()
  ],
  exports: [
    MarkdownModule
  ]
})
export class SharedModule { }
