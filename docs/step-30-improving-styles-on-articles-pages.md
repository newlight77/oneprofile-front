## Improving the UI of Articles Page

This step is quite simple. It's just about UI with CSS and HTML.

Here is what we have :

```html
<span class="flex-spacer"></span>

<div class="row">
  <div class="col-12 col-xl-6">
    <div class="articles-tags">
      <div class="articles-row-title">Tags</div>
      <div class="tag-container" *ngFor="let tag of tagCounts" (click)="filterByTag(tag.name)">
        <div class="row">
          <div class="col-12 col-xl-9">{{tag.name}}</div>
          <div class="col-12 col-xl-3">{{tag.count}}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-12 col-xl-6">
    <div class="articles-categories">
      <div class="articles-row-title">Categories</div>
      <div class="category-container" *ngFor="let category of categoryCounts" (click)="filterByCategory(category.name)">
        <div class="row">
          <div class="col-12 col-xl-9">{{category.name}}</div>
          <div class="col-12 col-xl-3">{{category.count}}</div>
        </div>
      </div>
    </div>
  </div>
</div>
```

We are going to change it to this :

```html
<div class="articles-row-title">Tags</div>
<div class="articles-tags">
  <div class="tag-container" *ngFor="let tag of tagCounts" (click)="filterByTag(tag.name)">
    <div class="row">
      <div class="col-12 col-xl-9">{{tag.name}}</div>
      <div class="col-12 col-xl-3">{{tag.count}}</div>
    </div>
  </div>
</div>
<div class="articles-row-title">Categories</div>
<div class="articles-categories">
  <div class="category-container" *ngFor="let category of categoryCounts" (click)="filterByCategory(category.name)">
    <div class="row">
      <div class="col-12 col-xl-9">{{category.name}}</div>
      <div class="col-12 col-xl-3">{{category.count}}</div>
    </div>
  </div>
</div>
```

And let's adjust the CSS, replacing this block :

```css
.articles-row-title {
  // color: #4D4D4D;
  font-weight: 500;
  font-size:130%;
  text-align: center;
}

.tag-container {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.category-container {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}
```

By this :

```css
.articles-header {
  margin: 10px;
}

.articles-header-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  font-size: 0.9em;
  grid-column-gap: 2em;
  padding: 0px;
  list-style: none;
}

.articles-title {
  font-weight: 500;
  font-size:130%;
  margin: 20px;
  text-align: center;
}
```

Here we use `display : grid` with some other attributes to display tags and categoris with 2 colums.
