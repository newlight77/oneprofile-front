## Material Theme

We are going to customize a bit the material theme.

- First edit ./src/style.scsss :

```css
@import './styles/reset.scss';
@import './styles/custom.scss';
@import './styles/material.scss';

:root {
  --primary-50: 229, 243, 252;
  --primary-100: 189, 224, 247;
  --primary-200: 145, 204, 242;
  --primary-300: 101, 184, 237;
  --primary-400: 68, 168, 233;
  --primary-500: 35, 153, 229;
  --primary-600: 31, 145, 226;
  --primary-700: 26, 134, 222;
  --primary-800: 21, 124, 218;
  --primary-900: 12, 107, 211;
  --primary-A100: 254, 255, 255;
  --primary-A200: 203, 226, 255;
  --primary-A400: 152, 197, 255;
  --primary-A700: 127, 182, 255;
  --accent-50: 236, 239, 241;
  --accent-100: 207, 216, 220;
  --accent-200: 176, 190, 197;
  --accent-300: 144, 164, 174;
  --accent-400: 120, 145, 156;
  --accent-500: 96, 125, 139;
  --accent-600: 88, 117, 131;
  --accent-700: 78, 106, 120;
  --accent-800: 68, 96, 110;
  --accent-900: 51, 77, 91;
  --accent-A100: 171, 225, 255;
  --accent-A200: 120, 206, 255;
  --accent-A400: 69, 188, 255;
  --accent-A700: 43, 179, 255;
  --warn-50: 246, 228, 227;
  --warn-100: 234, 189, 185;
  --warn-200: 220, 145, 139;
  --warn-300: 205, 100, 93;
  --warn-400: 195, 67, 58;
  --warn-500: 184, 34, 23;
  --warn-600: 177, 30, 20;
  --warn-700: 168, 25, 17;
  --warn-800: 160, 20, 13;
  --warn-900: 145, 12, 7;
  --warn-A100: 255, 191, 190;
  --warn-A200: 255, 141, 139;
  --warn-A400: 255, 91, 88;
  --warn-A700: 255, 66, 63;
}
```

- Then, create these 3 files under ./styles :

```sh
mkdir ./styles
touch ./styles/reset.scss
touch ./styles/custom.scss
touch ./styles/material.scss
```

### CSS Reset

Edit ./styles/reset.scss :

```css
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
html,
body {
  height: 100%;
}
```

The reset file will reset every css style to defaut. The basic reason is that all browsers have presentation defaults, but no browsers have the same defaults.

The goal of a reset stylesheet is to reduce browser inconsistencies in things like default line heights, margins and font sizes of headings, and so on. Reset styles quite often appear in CSS frameworks.

The reset styles given here are intentionally very generic. There isn't any default color or background set for the body element, for example. I don't particularly recommend that you just use this in its unaltered state in your own projects. It should be tweaked, edited, extended, and otherwise tuned to match your specific reset baseline. Fill in your preferred colors for the page, links, and so on. __In other words, this is a starting point, not a self-contained black box of no-touchiness__.

Please read [CSS Tools: Reset CSS](https://meyerweb.com/eric/tools/css/reset/) and [Reset Reasoning](http://meyerweb.com/eric/thoughts/2007/04/18/reset-reasoning/) for more detail explanation.

### Custom CSS

 Edit ./styles/custom.scss :

```css
.title {
    background-color: rgba(31, 30, 114, 0.1);
    padding: 10px 10px 10px 10px;
    border-radius: 4px;
}

#footer {
    clear: both;
    position: relative;
    z-index: 10;
    margin-top: 2em;
    border-top: 1px solid rgba(163, 147, 130, .1);
    border-bottom: 1px solid rgba(163, 147, 130, .1);
}
```

### Material CSS

Edit ./styles/material.scss :

```css
@import 'themes/theme';

@include mat-core();

// @include angular-material-theme($theme);

// Include all theme styles for the components.

// Here we include manually all Angular Material componenent rather than angular-material-theme
// Because datepicker and sort theme is not compatible with css var (use sass function which is not compatible)
// @TODO: Include only the component we use
@include mat-core-theme($theme);
@include mat-autocomplete-theme($theme);
// @include mat-badge-theme($theme);
// @include mat-bottom-sheet-theme($theme);
@include mat-button-theme($theme);
// @include mat-button-toggle-theme($theme);
// @include mat-card-theme($theme);
// @include mat-checkbox-theme($theme);
// @include mat-chips-theme($theme);
// @include mat-table-theme($theme);
//@include mat-datepicker-theme($theme);
// @include mat-dialog-theme($theme);
// @include mat-divider-theme($theme);
// @include mat-expansion-panel-theme($theme);
@include mat-form-field-theme($theme);
// @include mat-grid-list-theme($theme);
@include mat-icon-theme($theme);
@include mat-input-theme($theme);
@include mat-list-theme($theme);
// @include mat-menu-theme($theme);
// @include mat-paginator-theme($theme);
// @include mat-progress-bar-theme($theme);
// @include mat-progress-spinner-theme($theme);
// @include mat-radio-theme($theme);
// @include mat-select-theme($theme);
// @include mat-sidenav-theme($theme);
// @include mat-slide-toggle-theme($theme);
// @include mat-slider-theme($theme);
// @include mat-stepper-theme($theme);
//@include mat-sort-theme($theme);
// @include mat-tabs-theme($theme);
@include mat-toolbar-theme($theme);
// @include mat-tooltip-theme($theme);
// @include mat-tree-theme($theme);
// @include mat-snack-bar-theme($theme);
```

Here we include all Angular Material componenent rather than angular-material-theme. Depending on our needs, we may include any material in this class.

In this file, we have import theme.css.

```css
@import 'themes/theme';
```

So we need to create that file.

```sh
mkdir ./styles/themes
touch ./styles/themes/_theme.scss
```

### Theme SCSS

Edit ./styles/themes/_theme.scss :

```css
@import '~@angular/material/_theming';

// mcg.mbitson.com : palette generator

// Define a theme.
/* For use in src/lib/core/theming/_palette.scss */
$md-primary: (
  50 : #e4e5e6,
    100 : #bbbec0,
    200 : #8d9296,
    300 : #5f666c,
    400 : #3d464d,
    500 : #1b252d,
    600 : #182128,
    700 : #141b22,
    800 : #10161c,
    900 : #080d11,
    A100 : #54bbff,
    A200 : #21a6ff,
    A400 : #008eed,
    A700 : #007fd4,
    contrast: (
        50 : #000000,
        100 : #000000,
        200 : #000000,
        300 : #ffffff,
        400 : #ffffff,
        500 : #ffffff,
        600 : #ffffff,
        700 : #ffffff,
        800 : #ffffff,
        900 : #ffffff,
        A100 : #000000,
        A200 : #000000,
        A400 : #ffffff,
        A700 : #ffffff,
    )
);

$md-accent: (
  50: #eceff1,
  100: #cfd8dc,
  200: #b0bec5,
  300: #90a4ae,
  400: #78919c,
  500: #607d8b,
  600: #587583,
  700: #4e6a78,
  800: #44606e,
  900: #334d5b,
  A100: #abe1ff,
  A200: #78ceff,
  A400: #45bcff,
  A700: #2bb3ff,
  contrast: (
    50: #000000,
    100: #000000,
    200: #000000,
    300: #000000,
    400: #000000,
    500: #ffffff,
    600: #ffffff,
    700: #ffffff,
    800: #ffffff,
    900: #ffffff,
    A100: #000000,
    A200: #000000,
    A400: #000000,
    A700: #000000,
  ),
);

$primaryPalette: mat-palette($md-primary);
$accentPalette: mat-palette($md-accent);

$theme: mat-light-theme($primaryPalette, $accentPalette);
```

Here we have imported ~@angular/material/_theming, we still use pre-built theme.

### Override Material Theme (optional and may not work as-is)

Alternatively, we may also override the Material Theme.

Edit ./styles/themes/_theme.scss :

```css
@import '~@angular/material/theming';
@import './_material_override';

// Define a theme.
/* For use in src/lib/core/theming/_palette.scss */
$custom-primary: (
  50: var(--primary-50),
  100: var(--primary-100),
  200: var(--primary-200),
  300: var(--primary-300),
  400: var(--primary-400),
  500: var(--primary-500),
  600: var(--primary-600),
  700: var(--primary-700),
  800: var(--primary-800),
  900: var(--primary-900),
  A100: var(--primary-A100),
  A200: var(--primary-A200),
  A400: var(--primary-A400),
  A700: var(--primary-A700),
  contrast: (
    50: unquote('0, 0, 0'),
    100: unquote('0, 0, 0'),
    200: unquote('0, 0, 0'),
    300: unquote('0, 0, 0'),
    400: unquote('0, 0, 0'),
    500: unquote('255, 255, 255'),
    600: unquote('255, 255, 255'),
    700: unquote('255, 255, 255'),
    800: unquote('255, 255, 255'),
    900: unquote('255, 255, 255'),
    A100: unquote('0, 0, 0'),
    A200: unquote('255, 255, 255'),
    A400: unquote('255, 255, 255'),
    A700: unquote('255, 255, 255'),
  ),
);

$custom-accent: (
  50: var(--accent-50),
  100: var(--accent-100),
  200: var(--accent-200),
  300: var(--accent-300),
  400: var(--accent-400),
  500: var(--accent-500),
  600: var(--accent-600),
  700: var(--accent-700),
  800: var(--accent-800),
  900: var(--accent-900),
  A100: var(--accent-A100),
  A200: var(--accent-A200),
  A400: var(--accent-A400),
  A700: var(--accent-A700),
  contrast: (
    50: unquote('0, 0, 0'),
    100: unquote('0, 0, 0'),
    200: unquote('0, 0, 0'),
    300: unquote('255, 255, 255'),
    400: unquote('255, 255, 255'),
    500: unquote('255, 255, 255'),
    600: unquote('255, 255, 255'),
    700: unquote('255, 255, 255'),
    800: unquote('255, 255, 255'),
    900: unquote('255, 255, 255'),
    A100: unquote('0, 0, 0'),
    A200: unquote('255, 255, 255'),
    A400: unquote('255, 255, 255'),
    A700: unquote('255, 255, 255'),
  ),
);

$primaryPalette: mat-palette($custom-primary);
$accentPalette: mat-palette($custom-accent);
$theme: mat-light-theme($primaryPalette, $accentPalette);
```

Here we have imported ./styles/themes/_material_override.scss, we need to create that file:

```sh
touch ./styles/themes/_material_override.scss
```

Edit ./styles/themes/_material_override.scss :

```css
/********** */
/***** Angular-material to be compatible with css var ******/
/********** */
// ONLY DIFFERENCE WITH MATERIAL => check if $color is a color
// if this is the case, use RGBA to no use sass mixin but css function and do not call opacity on color and force 1 when null
@function mat-color($palette, $hue: default, $opacity: null) {
  // If hueKey is a number between zero and one, then it actually contains an
  // opacity value, so recall this function with the default hue and that given opacity.
  @if type-of($hue) == number and $hue >= 0 and $hue <= 1 {
    @return mat-color($palette, default, $hue);
  }

  $color: map-get($palette, $hue);

  @if (type-of($color) == color) {
    $opacity: if($opacity == null, opacity($color), $opacity);
    @return rgba($color, $opacity);
  } @else {
    $opacity: if($opacity == null, 1, $opacity);
    @return RGBA($color, $opacity);
  }
}
  
  // ONLY DIFFERENCE WITH MATERIAL => backdrop color
@mixin mat-sidenav-theme($theme) {
  $primary: map-get($theme, primary);
  $accent: map-get($theme, accent);
  $warn: map-get($theme, warn);
  $background: map-get($theme, background);
  $foreground: map-get($theme, foreground);

  $drawer-backdrop-color: black !default;
  $drawer-background-color: mat-color($background, dialog) !default;
  $drawer-container-background-color: mat-color(
    $background,
    background
  ) !default;
  $drawer-push-background-color: mat-color($background, dialog) !default;

  .mat-drawer-container {
    background-color: $drawer-container-background-color;
    color: mat-color($foreground, text);
  }

  .mat-drawer {
    background-color: $drawer-background-color;
    color: mat-color($foreground, text);

    &.mat-drawer-push {
      background-color: $drawer-push-background-color;
    }
  }

  .mat-drawer-backdrop.mat-drawer-shown {
    background-color: $drawer-backdrop-color;
    opacity: 0.45;
  }

  .mat-checkbox-frame {
    border-width: 1px !important;
  }

  .mat-checkbox-inner-container {
    height: 14px;
    width: 14px;
  }
}
```

With this done, we can now customize a theme and have mutliple themes. We may also use css var.
