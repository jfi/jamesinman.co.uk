---
layout: post
title: "Custom Error Pages in Rails 8"
date: 2026-03-12
reading_time: 8
tags:
  - ruby:ruby
  - Ruby on Rails:rubyonrails
---

Rails applications need to handle errors gracefully. By default, Rails serves generic error pages from the `public/` directory, but these don't match your application's design and provide a poor user experience. This guide shows you how to create custom error pages that integrate seamlessly with your Rails application's design.

## The problem with default error pages

Out of the box, Rails looks for static HTML files in `public/` for common HTTP error codes: `public/404.html`, `public/500.html`, and `public/422.html`. These static files have several drawbacks: no access to your layouts or design system, no `i18n` support, no dynamic content, and a maintenance burden of updating multiple static HTML files whenever your design changes.

## The solution: ErrorsController

Instead of static files, route all errors through a dedicated controller that has full access to your Rails application.

### Step 1: Create the ErrorsController

```ruby
class ErrorsController < ApplicationController
  # Define which error codes you want to handle
  SUPPORTED_CODES = [400, 404, 406, 422, 500].freeze

  def show
    code = params[:code].to_i
    @code = SUPPORTED_CODES.include?(code) ? code : 500

    @title = t("errors.#{@code}.title")
    @description = t("errors.#{@code}.description")

    render status: @code
  end
end
```

The controller lists which HTTP status codes have custom pages in `SUPPORTED_CODES`, defaults unsupported codes to 500, fetches localised strings from your `i18n` translations, and renders with the correct HTTP status code.

### Step 2: Create the error view

```erb
<div class="flex flex-1 items-center justify-center px-6 py-16 lg:py-24">
  <div class="text-center max-w-lg">
    <div class="text-8xl sm:text-9xl font-bold leading-none text-zinc-200 tracking-tight">
      <%= @code %>
    </div>

    <h1 class="mt-4 text-2xl sm:text-3xl font-semibold text-brand-dark">
      <%= @title %>
    </h1>

    <p class="mt-4 text-base leading-7 text-zinc-600"><%= @description %></p>
  </div>
</div>
```

This example is using [Tailwind CSS](https://tailwindcss.com) and global variables, but will be easy to adapt to your use case.

### Step 3: Add translations

```yaml
en:
  errors:
    '400':
      title: 'Bad request'
      description: >
        We couldn't process your request. Please check the information
        you submitted and try again.
    '404':
      title: 'Page not found'
      description: >
        Sorry, we couldn't find the page you're looking for. It may have
        been moved or no longer exists.
    '406':
      title: 'Browser not supported'
      description: >
        Your browser is not supported. Please upgrade to a modern browser
        to continue using this application.
    '422':
      title: "Request couldn't be processed"
      description: >
        The information you submitted couldn't be processed. This might be
        due to a form security issue. Please go back and try again.
    '500':
      title: 'Something went wrong'
      description: >
        We're sorry, but something unexpected happened on our end. Our team
        has been notified and we're working to fix it.
```

### Step 4: Configure routes

Add this to the **bottom** of `config/routes.rb`:

```ruby
# Custom error pages - must be last route
match "/:code", to: "errors#show", via: :all, constraints: {code: /\d{3}/}
```

This catch-all route matches any three-digit HTTP status code and routes it to your `ErrorsController`.

### Step 5: Configure the application

In `config/application.rb`:

```ruby
# Use custom error pages defined in routes
config.exceptions_app = routes
```

This tells Rails to use your routes (and therefore your `ErrorsController`) for error handling.

### Step 6: The critical environment configuration

This is the step that's easy to miss. In both `config/environments/production.rb` and `config/environments/development.rb`:

```ruby
# Route ALL exceptions through exceptions_app (ErrorsController)
config.action_dispatch.show_exceptions = :all
```

Without this, Rails' `ShowExceptions` middleware has special handling for certain HTTP status codes (like 406 Not Acceptable). It attempts to serve static HTML files from `public/` before falling back to your `exceptions_app`, causing errors like:

```
ArgumentError: File /rails/public/406-unsupported-browser.html does not exist
```

Setting `show_exceptions = :all` forces Rails to route **all** exceptions through your `ErrorsController`, bypassing the static file lookup entirely.

## Testing your error pages

To test in development, either raise specific exceptions in a controller action or visit routes directly:

```
http://localhost:3000/404
http://localhost:3000/500
http://localhost:3000/406
```

## Adding new error codes

To support a new error code, add it to `SUPPORTED_CODES` in the `ErrorsController`, add translations for the new code in your locale file, and restart your server. That's it.

## Common gotchas

**Missing show_exceptions configuration** — if you're seeing errors about missing static files like `406-unsupported-browser.html`, you need `config.action_dispatch.show_exceptions = :all` in your environment configs.

**Routes order matters** — the error catch-all route must be the **last** route in `routes.rb`, otherwise it will catch legitimate routes.

**Infinite loops** — if your error page itself causes an error, you'll get an infinite loop. Prevent this by skipping authentication in `ErrorsController`, avoiding dependencies on instance variables that might not exist, and keeping error pages simple without complex database queries or external API calls.

*This approach works with Rails 7+ and is compatible with modern Rails 8 applications.*
