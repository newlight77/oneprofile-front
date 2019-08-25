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

  categories(): string {
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

  tags(): any {
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


    // Flattening an array of arrays
    // ARTICLES.reduce( (acc, a) => {
    //   let tags = new Array<string>();
    //   a.tags.forEach(t => {
    //     tags.push(t);
    //   });
    //   return tags;
    // }, []);

}
