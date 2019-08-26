import { TestBed } from '@angular/core/testing';

import { ArticlesService } from './articles.service';
import { Article } from '../model/article';


describe('ArticlesService', () => {

  const ARTICLES: Array<Article> = [
    // tslint:disable-next-line:max-line-length
    { id: 'dojo-kata1', title: 'Coding Dojo & Kata1', categories: 'crafts, testing'.split(','), tags: 'test, kata, crafts, solid'.split(','), author: 'Kong To', content: '## Coding Dojo & Kata1' },
    // tslint:disable-next-line:max-line-length
    { id: 'dojo-kata2', title: 'Coding Dojo & Kata2', categories: 'crafts, agile'.split(','), tags: 'test, kata, crafts, clean code'.split(','), author: 'Kong To', content: '## Coding Dojo & Kata2' },
    // tslint:disable-next-line:max-line-length
    { id: 'dojo-kata3', title: 'Coding Dojo & Kata3', categories: 'crafts'.split(','), tags: 'test, kata, crafts, principles, kiss'.split(','), author: 'Kong To', content: '## Coding Dojo & Kata3 keyword' },
  ];

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticlesService = TestBed.get(ArticlesService);
    expect(service).toBeTruthy();
  });

  it('should list all distinct tags', () => {
    const service: ArticlesService = TestBed.get(ArticlesService);
    spyOn(service, 'articles').and.returnValue(ARTICLES);
    const tags = service.tagCounts().sort();

    expect(tags.length).toEqual(7);
    expect(tags[0].name).toEqual('test');
    expect(tags[0].count).toEqual(3);
    expect(tags[1].name).toEqual('kata');
    expect(tags[1].count).toEqual(3);
    expect(tags[2].name).toEqual('crafts');
    expect(tags[2].count).toEqual(3);
    expect(tags[3].name).toEqual('solid');
    expect(tags[3].count).toEqual(1);
    expect(tags[4].name).toEqual('clean code');
    expect(tags[4].count).toEqual(1);
    expect(tags[5].name).toEqual('principles');
    expect(tags[5].count).toEqual(1);
    expect(tags[6].name).toEqual('kiss');
    expect(tags[6].count).toEqual(1);
  });

  it('should list all distinct categories', () => {
    const service: ArticlesService = TestBed.get(ArticlesService);
    spyOn(service, 'articles').and.returnValue(ARTICLES);
    const categories = service.categoryCounts().sort();

    expect(categories.length).toEqual(3);
    expect(categories[0].name).toEqual('crafts');
    expect(categories[0].count).toEqual(3);
    expect(categories[1].name).toEqual('testing');
    expect(categories[1].count).toEqual(1);
    expect(categories[2].name).toEqual('agile');
    expect(categories[2].count).toEqual(1);
  });

  it('should filter tags', () => {
    const service: ArticlesService = TestBed.get(ArticlesService);
    spyOn(service, 'articles').and.returnValue(ARTICLES);
    const articles = service.filterByTag('kiss');

    expect(articles.length).toEqual(1);
    expect(articles[0].tags[4].trim()).toEqual('kiss');
  });

  it('should filter categories', () => {
    const service: ArticlesService = TestBed.get(ArticlesService);
    spyOn(service, 'articles').and.returnValue(ARTICLES);
    const articles = service.filterByCategory('agile');

    expect(articles.length).toEqual(1);
    expect(articles[0].categories[1].trim()).toEqual('agile');
  });

  it('should filter by keyword present in title', () => {
    const service: ArticlesService = TestBed.get(ArticlesService);
    spyOn(service, 'articles').and.returnValue(ARTICLES);
    const articles = service.filterBySearchKeyword('Kata3');

    expect(articles.length).toEqual(1);
    expect(articles[0].title.trim()).toContain('Kata3');
  });

  it('should filter by keyword present in tags', () => {
    const service: ArticlesService = TestBed.get(ArticlesService);
    spyOn(service, 'articles').and.returnValue(ARTICLES);
    const articles = service.filterBySearchKeyword('kis');

    expect(articles.length).toEqual(1);
    expect(articles[0].tags[4]).toContain('kiss');
  });

  it('should filter by keyword present in content', () => {
    const service: ArticlesService = TestBed.get(ArticlesService);
    spyOn(service, 'articles').and.returnValue(ARTICLES);
    const articles = service.filterBySearchKeyword('keyw');

    expect(articles.length).toEqual(1);
    expect(articles[0].content).toContain('keyword');
  });

});
