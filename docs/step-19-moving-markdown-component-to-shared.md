## Moving Markdown Component to shared module

At 2 previous step, we had refactoring the guides to component and made one markdown component to display the multiple guide pages. We made all tests passed for that component. Now if we look back to the other components, we had created the HomeCommunityComponnt that display also contents form a markdown file. So this means we have duplicated component to exactly the same thing. Why don't we use the same component for the guides pages and community page? Let's go.

First let's move the GuidesMarkdownPageComponent to the share module and by the way rename it to MarkdownComponent.

```sh
renamed:    src/app/guides/guides-markdown-page/guides-markdown-page.component.html -> src/app/shared/markdown/markdown.component.html
renamed:    src/app/guides/guides-markdown-page/guides-markdown-page.component.scss -> src/app/shared/markdown/markdown.component.scss
renamed:    src/app/guides/guides-markdown-page/guides-markdown-page.component.spec.ts -> src/app/shared/markdown/markdown.component.spec.ts
renamed:    src/app/guides/guides-markdown-page/guides-markdown-page.component.ts -> src/app/shared/markdown/markdown.component.ts
```

Of course, there are many manual thing to do :

- rename the class name
- remove the markdown component from declarations in guides module
- rename class name reference in the routes, as markdown component class has changed
- add the markdown component in declarations in shared module

### Switch to MarkdownComponent in HomeRoutingModule

Once we have move MarkdownComponent to Shared module, we can use it in home section, in the place of HomeCommunityPage.

First, remove the community component from declarations in home module :

```ts
-import { HomeCommunityPageComponent } from './home-community-page/home-community-page.component';
 import { HomeEventsPageComponent } from './home-events-page/home-events-page.component';
 import { HomePageComponent } from './home-page/home-page.component';
...
declarations: [
     HomeLandingPageComponent,
-    HomeCommunityPageComponent,
```

Then make change to the HomeModule :

```ts

import { HomePageComponent } from './home-page/home-page.component';
-import { HomeCommunityPageComponent } from './home-community-page/home-community-page.component';
 import { HomeEventsPageComponent } from './home-events-page/home-events-page.component';
 import { HomeLandingPageComponent } from './home-landing-page/home-landing-page.component';
+import { MarkdownComponent } from '../shared/markdown/markdown.component';

     children: [
       { path: '', redirectTo: 'landing', pathMatch: 'full' },
       { path: 'landing', component: HomeLandingPageComponent, pathMatch: 'full' },
-      { path: 'community', component: HomeCommunityPageComponent, pathMatch: 'full' },
+      { path: 'community', component: MarkdownComponent, pathMatch: 'full', data: {markdown: 'home/community'} },
       { path: 'events', component: HomeEventsPageComponent, pathMatch: 'full' },
```

At last, delete the HomeCommunityPageComponent from the codebase.
