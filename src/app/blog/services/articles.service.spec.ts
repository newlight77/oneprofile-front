import { TestBed } from '@angular/core/testing';

import { ArticlesService } from './articles.service';
import { Article, ListType } from '../model/article';


describe('ArticlesService', () => {

  const ARTICLES: Array<Article> = [
    // tslint:disable-next-line:max-line-length
    { id: 'dojo-kata1', title: 'Coding Dojo & Kata1', categories: 'crafts, testing'.split(','), tags: 'test, kata, crafts, solid'.split(','), author: 'Kong To', content: '## Coding Dojo & Kata' },
    // tslint:disable-next-line:max-line-length
    { id: 'dojo-kata2', title: 'Coding Dojo & Kata2', categories: 'crafts, agile'.split(','), tags: 'test, kata, crafts, clean code'.split(','), author: 'Kong To', content: '## Coding Dojo & Kata' },
    // tslint:disable-next-line:max-line-length
    { id: 'dojo-kata3', title: 'Coding Dojo & Kata3', categories: 'crafts'.split(','), tags: 'test, kata, crafts, principles, kiss'.split(','), author: 'Kong To', content: '## Coding Dojo & Kata' },
  ];

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticlesService = TestBed.get(ArticlesService);
    expect(service).toBeTruthy();
  });

  it('should list all distinct tags', () => {
    const service: ArticlesService = TestBed.get(ArticlesService);
    spyOn(service, 'articles').and.returnValue(ARTICLES);
    const tags = service.tags();

    expect(tags['test']).toEqual(3);
    expect(tags['kata']).toEqual(3);
    expect(tags['clean code']).toEqual(1);
    expect(tags['solid']).toEqual(1);
    expect(tags['principles']).toEqual(1);
    expect(tags['kiss']).toEqual(1);
  });

  it('should list all distinct categories', () => {
    const service: ArticlesService = TestBed.get(ArticlesService);
    spyOn(service, 'articles').and.returnValue(ARTICLES);
    const categories = service.categories();

    expect(categories['crafts']).toEqual(3);
    expect(categories['testing']).toEqual(1);
    expect(categories['agile']).toEqual(1);
  });
});
