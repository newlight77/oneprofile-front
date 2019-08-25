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

    const tags = this.articleService.tags();
    Object.getOwnPropertyNames(tags).forEach(t => {
      const tagCount = new TagCount();
      tagCount.name = t;
      tagCount.count = tags[t];
      this.tagCounts.push(tagCount);
    });

    const categories = this.articleService.categories();
    Object.getOwnPropertyNames(categories).forEach(c => {
      const categoryCount = new CategoryCount();
      categoryCount.name = c;
      categoryCount.count = categories[c];
      this.categoryCounts.push(categoryCount);
    });
  }

}
