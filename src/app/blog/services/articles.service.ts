import { Injectable } from '@angular/core';

import { Article, ListType, ARTICLES, TagCount, CategoryCount } from '../model/article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor() { }

  articles(): Array<Article> {
    return ARTICLES;
  }

  private categories(): string {
    return this.articles()
      // Flattening to an array of tags as tring
      .reduce((acc, a: Article) => [...acc, ...a.categories], [])
      // stats with number per tag
      .reduce((acc: Array<any>, t: string) => {
        t = t.trim();
        acc[t] = acc[t] + 1 || 1;
        return acc;
      }, {});
  }

  private tags(): any {
    return this.articles()
      // Flattening to an array of tags as tring
      .reduce((acc, a: Article) => [...acc, ...a.tags], [])
      // stats with number per tag
      .reduce((acc, t: string) => {
        t = t.trim();
        acc[t] = acc[t] + 1 || 1;
        return acc;
    }, {});
  }

  tagCounts(): Array<TagCount> {
    const tagCounts = [];
    const tags = this.tags();
    Object.getOwnPropertyNames(tags).forEach(t => {
      tagCounts.push(new TagCount(t, tags[t]));
    });
    return tagCounts;
  }

  categoryCounts(): Array<CategoryCount> {
    const categoryCounts = [];
    const categories = this.categories();
    Object.getOwnPropertyNames(categories).forEach(c => {
      categoryCounts.push(new CategoryCount(c, categories[c]));
    });
    return categoryCounts;
  }


  filterByTag(tag: string): Array<Article> {
    return this.articles().filter(a => {
      return this.contains(a.tags, tag);
    });
  }

  filterByCategory(category: string): Array<Article> {
    return this.articles().filter(a => {
      return this.contains(a.categories, category);
    });
  }

  private contains(list: Array<string>, item: string) {
    let filtered = false;
    list.forEach(element => {
      if (element.trim() === item) {
        filtered = true;
      }
    });
    return filtered;
  }

}
