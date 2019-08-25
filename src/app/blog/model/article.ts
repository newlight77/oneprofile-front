export class Article {
    id = '';
    title = '';
    author = '';
    categories = new Array();
    tags = new Array();
    content = '';
}

export type ListType = 'default' | 'categories' | 'tags' | 'author';

export class TagCount {
    name: string;
    count: string;
}

export class CategoryCount {
    name: string;
    count: string;
}

export const ARTICLES: Array<Article> = [
    // tslint:disable-next-line:max-line-length
    { id: 'dojo-kata1', title: 'Coding Dojo & Kata1', categories: 'crafts, testing'.split(','), tags: 'test, kata, crafts, solid'.split(','), author: 'Kong To', content: '## Coding Dojo & Kata' },
    // tslint:disable-next-line:max-line-length
    { id: 'dojo-kata2', title: 'Coding Dojo & Kata2', categories: 'crafts, testing'.split(','), tags: 'test, kata, crafts, clean code'.split(','), author: 'Kong To', content: '## Coding Dojo & Kata' },
    // tslint:disable-next-line:max-line-length
    { id: 'dojo-kata3', title: 'Coding Dojo & Kata3', categories: 'crafts, testing'.split(','), tags: 'test, kata, crafts, principles, kiss'.split(','), author: 'Kong To', content: '## Coding Dojo & Kata' },
    // tslint:disable-next-line:max-line-length
    { id: 'dojo-kata4', title: 'Coding Dojo & Kata4', categories: 'crafts, testing'.split(','), tags: 'test, kata, crafts, stupid, linux, solid'.split(','), author: 'Kong To', content: '## Coding Dojo & Kata' },
    // tslint:disable-next-line:max-line-length
    { id: 'dojo-kata5', title: 'Coding Dojo & Kata5', categories: 'crafts, testing, agile'.split(','), tags: 'test, kata, crafts, tools, agile'.split(','), author: 'Kong To', content: '## Coding Dojo & Kata' },
];
