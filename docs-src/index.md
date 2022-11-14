---
layout: page.11ty.cjs
title: <main-element> ⌲ Home
---

# &lt;main-element>

`<main-element>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<main-element>` is just an HTML element. You can it anywhere you can use HTML!

```html
<main-element></main-element>
```

  </div>
  <div>

<main-element></main-element>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<main-element>` can be configured with attributed in plain HTML.

```html
<main-element name="HTML"></main-element>
```

  </div>
  <div>

<main-element name="HTML"></main-element>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<main-element>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name = 'lit-html';

render(
  html`
    <h2>This is a &lt;main-element&gt;</h2>
    <main-element .name=${name}></main-element>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;main-element&gt;</h2>
<main-element name="lit-html"></main-element>

  </div>
</section>
