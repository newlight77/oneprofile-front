export class Article {
    id = '';
    title = '';
    author = '';
    categories = new Array();
    tags = new Array();
    sommary = '';
    mdFilename = '';
}

export class TagCount {
    name: string;
    count: number;

    constructor(name: string, count: number) {
        this.name = name;
        this.count = count;
    }
}

export class CategoryCount {
    name: string;
    count: number;

    constructor(name: string, count: number) {
        this.name = name;
        this.count = count;
    }
}

export const ARTICLES: Array<Article> = [
    // tslint:disable-next-line:max-line-length
    { id: '2018-08-27-design-patterns', title: 'Design patterns by example', categories: 'design patterns'.split(','), tags: 'java, spring, design patterns'.split(','), author: 'Kong To', sommary: 'Design patterns are considered as good practices as they are generic, repeatable and re-usable solutions in software design. They aims to describe how problems could be solved in a commonly known pattern so it will easy the understanding.', mdFilename: '2018-08-27-design-patterns'  },
    // tslint:disable-next-line:max-line-length
    { id: '2018-08-28-RESTful-web-services', title: 'RESTful web services explained', categories: 'architecture, java'.split(','), tags: 'jest, spring, unit test, rest'.split(','), author: 'Kong To', sommary: 'Nowadways, most of backend services provides REST APIs for client such as frontend applications to consume. Therefore, it is very important to understand what it defines and how to implement RESTful web services or to consume them properly and more effiently.', mdFilename: '2018-08-28-RESTful-web-services'  },
    // tslint:disable-next-line:max-line-length
    { id: '2018-08-29-RESTful-json-patch-by-example', title: 'RESTful json-patch by example', categories: 'architecture, java'.split(','), tags: 'spring, java, rest'.split(','), author: 'Kong To', sommary: 'JSON Patch is a format for describing changes to a JSON document. It can be used to avoid sending a whole document when only a part has changed.', mdFilename: '2018-08-29-RESTful-json-patch-by-example'  },
    // tslint:disable-next-line:max-line-length
    { id: '2018-09-06-springboot-test-disable-security', title: 'How to test endpoints with Springboot by disabling security', categories: 'java, security'.split(','), tags: 'java, spring security, unit test, annotation, aspect'.split(','), author: 'Kong To', sommary: 'This article aims to show how to write tests when using springboot with security embedded.', mdFilename: '2018-09-06-springboot-test-disable-security' },
    // tslint:disable-next-line:max-line-length
    { id: '2018-09-08-linux-shortcuts-keys', title: 'Linux shell shortcuts', categories: 'server'.split(','), tags: 'shell, linux, shortcuts'.split(','), author: 'Kong To', sommary: 'The shortcuts below may be of use, and they are quite useful to me.', mdFilename: '2018-09-08-linux-shortcuts-keys' },
];
