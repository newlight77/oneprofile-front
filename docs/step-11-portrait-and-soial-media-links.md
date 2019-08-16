## Portrait and Social Media links

Now I would like to display my own portrait on the left panel, instead of the callout. Also I want to add simple links with icons.

First, I use gravatar to display mon photo. In the HomePageComponent html, I have editedas such :

```html
                 <mat-card-content class="panel-news-content">
-                    <img src="https://s.gravatar.com/avatar/2ab8133286eff8a9fb7cd77876135d2f?s=80" height="36%" width="36%">
-                    <span>Built by Kong To</span>
-                    <div #newsContainer class="callout left"></div>
+                        <div class="portrait">
+                            <img src="https://s.gravatar.com/avatar/2ab8133286eff8a9fb7cd77876135d2f?s=80" height="50%" width="50%">
+                            <div>
+                                <span><i>by</i><b> Kong To</b></span>
+                            </div>
+                        </div>
+                        <div class="social-media">
+                            <a href="https://twitter.com/newlight77">
+                                <img src="{{icons.twitter.color_base64_24px}}" alt="Kong To @ twitter">
+                            </a>
+                            <a href="https://github.com/newlight77">
+                                <img src="{{icons.github.color_base64_24px}}" alt="Kong To @ github">
+                            </a>
+                            <a href="https://linkedin.com/kongto">
+                                <img src="{{icons.linkedin.color_base64_24px}}" alt="Kong To @ linkedin">
+                            </a>
+                            <a href="newlight77@gmail.com">
+                                <img src="{{icons.email.color_base64_24px}}" alt="Email">
+                            </a>
+                        </div>
+                    <div #newsContainer ></div>
                 </mat-card-content>
```

As we can see, the `class="callout left"` style is removed and the image in now embraced within a `<div class="portrait">` and link to social media are inside `<div class="social-media">`. But there is one thing to nice. There is a binding to icons object from the component. Now we need to add that in the HomePageComponent.

Instead of putting that attribute directly inside HomePageComponent, icons are put inside a class. Let's create it :

```ts
ng generate class shared/icons --type=model
```

And declare all icons in there.

```ts
export const ICONS = {
    github: {
        // tslint:disable-next-line:max-line-length
        color_base64_24px: "data:image/png;base64,iVBORw0KGgoAAAAN..."
    },
    twitter: {
        // tslint:disable-next-line:max-line-length
        color_base64_24px: "data:image/png;base64,iVBORw0KGgoAAAA..."
    },
    email: {
        // tslint:disable-next-line:max-line-length
        color_base64_24px: "data:image/png;base64,iVBORw0KGgoAAAAN..."
    },
    linkedin: {
        // tslint:disable-next-line:max-line-length
        color_base64_24px: "data:image/png;base64,iVBORw0KGgoAAAAN..."
    }
}
```

Of course, we use a Base64 to have the full content of the image. Instead of downloading every file of icons we need, it's simplier to use base64. So this class host all icons we need. And it's easier to re-use. Also note that we need to use this `// tslint:disable-next-line:max-line-length` to disable linting on the base64 string which very long, else the `ng lint` woudl fail.
