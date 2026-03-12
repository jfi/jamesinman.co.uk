---
layout: post
title: "Professional Legal Document Numbering with CSS Counters and Rails"
date: 2026-02-15
reading_time: 12
published: false
tags:
  - ruby:ruby
  - Ruby on Rails:rubyonrails
  - opensource
---

When building legal pages — privacy policies, terms of service, cookie policies — for your web application, proper document structure and numbering are essential for clarity, professionalism, and usability. This guide walks through implementing a complete legal document numbering system using CSS counters and Rails view components.

## The challenge

Legal documents require hierarchical numbering that makes it easy to reference specific sections and clauses: main sections (1, 2, 3), subsections (4.1, 4.2), alphabetic lists ((a), (b), (c)), and nested clauses (4.3.1, 4.3.2). Without proper CSS, you'd need to manually number every section — which becomes error-prone when sections are added, removed, or reordered.

## The solution: CSS counters

CSS counters provide automatic numbering that updates dynamically as content changes. Here's the complete implementation.

### Base structure

```css
.legal-list {
  --label-width: 2.5rem;
  counter-reset: section;
}
```

The `--label-width` CSS variable defines consistent spacing for all numbering labels, ensuring proper alignment throughout the document.

### Main section headings

```css
.legal-list h2 {
  font-weight: 700;
  font-size: 1.125rem;
  display: grid;
  grid-template-columns: var(--label-width) 1fr;
  gap: 0.5rem;
  margin-top: 2em;
  counter-reset: subsection;
}

.legal-list h2:first-of-type {
  margin-top: 0;
}

.legal-list h2::before {
  counter-increment: section;
  content: counter(section) '.';
  font-family: inherit;
}
```

The grid layout creates perfect alignment between numbers and headings. `counter-reset: subsection` ensures each main section starts subsections at .1, and the `::before` pseudo-element generates the number automatically.

### Subsection headings

```css
.legal-list h3 {
  font-weight: 600;
  font-size: 1rem;
  display: grid;
  grid-template-columns: var(--label-width) 1fr;
  gap: 0.5rem;
  margin-top: 1.5em;
  counter-reset: subsection-item;
}

.legal-list h3::before {
  counter-increment: subsection;
  content: counter(section) '.' counter(subsection) '.';
  font-family: inherit;
}
```

The slightly lighter font weight (600 vs 700) and smaller size (1rem vs 1.125rem) creates visual hierarchy without overwhelming the reader. The numbering `4.1`, `4.2` immediately tells readers they're looking at subdivisions of section 4.

### Lists within subsections

This is where it gets interesting. Lists within h3 subsections need different numbering to avoid conflicts:

```css
.legal-list h3 ~ ol {
  counter-reset: subsection-item;
  list-style: none;
  padding-left: 0;
  margin-top: 0.75em;
}

.legal-list h3 ~ ol > li {
  counter-increment: subsection-item;
  margin-top: 0.5em;
  position: relative;
  padding-left: calc(var(--label-width) + 0.5rem);
}

.legal-list h3 ~ ol > li::before {
  content: '(' counter(subsection-item, lower-alpha) ')';
  font-family: inherit;
  position: absolute;
  left: 0;
  width: var(--label-width);
}
```

Without this, if section 4 has subsections 4.1 and 4.2, and subsection 4.1 contains a numbered list, that list would be numbered 4.1, 4.2, 4.3 — which conflicts with the subsection numbering. Using alphabetic numbering `(a), (b), (c)` prevents this ambiguity.

The sibling selector `h3 ~ ol` targets ordered lists that follow an h3 at the same DOM level, allowing context-specific styling.

### Nested numbered lists

For deeper nesting (like 4.3.1, 4.3.2):

```css
.legal-list ol ol {
  counter-reset: subclause;
  list-style: none;
  padding-left: 0;
  margin-top: 0.5em !important;
  margin-bottom: 0.25em !important;
}

.legal-list ol ol > li {
  counter-increment: subclause;
  margin-top: 0.5em;
  position: relative;
  padding-left: calc(var(--label-width) * 1.5 + 0.5rem);
}

.legal-list ol ol > li::before {
  content: counter(section) '.' counter(clause) '.' counter(subclause) '.';
  font-family: inherit;
  position: absolute;
  left: 0;
  width: calc(var(--label-width) * 1.5);
}
```

The increased left padding and label width creates visual indentation that mirrors the logical structure.

### Link styling

Links in legal documents should always be underlined for accessibility:

```css
.legal-list a {
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.legal-list a:hover {
  text-decoration-thickness: 2px;
}
```

In dense legal text, underlines make links immediately scannable without requiring colour vision. The `text-underline-offset` prevents underlines from colliding with descenders.

## The Rails implementation

Rather than using a generic `page(prose: true)` helper, we created a dedicated `legal_page` helper for semantic clarity.

### Component class

```ruby
module Website
  class LegalPageComponent < ApplicationComponent
    renders_one :hero

    def initialize(title:, **html_options)
      @title = title
      @html_options = html_options
    end

    attr_reader :title
  end
end
```

### Component template

```erb
<div class="mx-auto max-w-5xl px-6 text-center lg:px-8">
  <%%= helpers.h1 { title } %>
</div>

<%% if hero? %>
  <section class="mx-auto max-w-7xl px-6 pb-10 lg:px-8">
    <div class="mx-auto max-w-4xl text-center">
      <%%= hero %>
    </div>
  </section>
<%% end %>

<%% if content.present? %>
  <div class="legal-list mx-auto max-w-5xl px-6 pt-12 pb-20 lg:px-8 text-zinc-700 leading-relaxed space-y-4">
    <%%= content %>
  </div>
<%% end %>
```

### Usage

```erb
<%%= legal_page(title: "Privacy Policy") do |p| %>
  <h2>Introduction</h2>

  <h3>Data Collection</h3>
  <p>We collect the following types of data:</p>
  <ol>
    <li>Personal information you provide</li>
    <li>Usage data and analytics</li>
  </ol>
<%% end %>
```

## Real-world example

Here's how the numbering hierarchy works in practice:

```
1. Introduction
2. Who We Are
3. What We Collect
4. How We May Collect and Use Your Data
   4.1. Direct Interactions
        (a) use our Website
        (b) use any of our Services
        (c) create an account
   4.2. Data Usage and Your Rights
        (a) If you are already our customer...
        (b) If you are a new customer...
5. Cookies
   5.1. Session cookies
   5.2. Persistent cookies
        5.2.1. First-party cookies
        5.2.2. Third-party cookies
6. Your Rights
```

## Why legal numbering hierarchies matter

Proper hierarchy prevents ambiguity: without it, "4.1" could refer to either "subsection 4.1" or "clause 1 under section 4". It enables precise legal citations ("As per Section 4.2(b) of our Privacy Policy..."), makes change management transparent, and follows the ISO standard for legal numbering.

The investment in proper structure pays dividends in reduced support requests, easier policy updates, and a more professional user experience.

*This implementation is production-ready and used on [Charity Tools](https://charitytools.co.uk) for our Privacy Policy and Cookie Policy pages.*
