import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Article, ListType, TagCount, CategoryCount} from '../model/article';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-blog-articles-page',
  templateUrl: './blog-articles-page.component.html',
  styleUrls: ['./blog-articles-page.component.scss']
})
export class BlogArticlesPageComponent implements OnInit {

  listType: ListType = 'default';
  tagCounts = [];
  categoryCounts = [];
  articles: Array<Article> = [];

  constructor(private route: ActivatedRoute, private articleService: ArticlesService) { }

  ngOnInit() {
    this.listType = this.route.snapshot.data.listType;
    if (this.route.snapshot.data.listType) {
      this.listType = this.route.snapshot.data.listType;
    }

    this.articles = this.articleService.articles();
    this.tagCounts = this.articleService.tagCounts();
    this.categoryCounts = this.articleService.categoryCounts();
  }

  filterByTag(tag: string) {
    this.articles = this.articleService.filterByTag(tag);
  }

  filterByCategory(category: string) {
    this.articles = this.articleService.filterByCategory(category);
  }

}
