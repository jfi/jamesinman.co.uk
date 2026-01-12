---
layout: default
title: Latest
page_title: Latest
---

{% include header.html %}

<!-- Hero Section -->
<header class="mb-16">
  <div class="grid md:grid-cols-2 gap-12 mb-16">
    <div class="flex flex-col justify-between">
      <h1 class="text-[60px] font-display font-medium mb-8 leading-[97%] tracking-[-0.03em]">Tech & Thoughts.</h1>
      <div class="flex items-center h-[48px]">
        <a href="#projects-section" class="text-[#010A49] hover:opacity-70 transition-opacity cursor-pointer" aria-label="Scroll to projects section">
          <svg width="28" height="44" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M14 0L14 36M14 36L8 30M14 36L20 30" stroke="currentColor" stroke-width="3.5"/>
          </svg>
        </a>
      </div>
    </div>
    <div class="flex flex-col justify-between">
      <p class="text-[32px] text-secondaryText font-sans font-normal mb-6 leading-[1.55] tracking-[-0.03em]">
        A collection of <strong>projects</strong> I've worked on and <strong>thoughts</strong> on technology, mental health, and the intersection of the two.
      </p>
    </div>
  </div>
</header>

<!-- Recent Projects Section -->
<section id="projects-section" class="mb-20">
  <h2 class="text-[20px] font-body font-medium mb-6 uppercase leading-[122%] tracking-[-0.03em]">Recent Projects</h2>
  <div class="space-y-4">
    {% assign sorted_projects = site.data.projects | sort: "date" | reverse %}
    {% for project in sorted_projects %}
    <div class="bg-white border border-cardBorder rounded p-6 hover:shadow-md transition-shadow">
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div class="flex-1">
          <h3 class="text-xl font-body font-medium mb-1">
            <a href="{{ project.link }}" target="_blank" rel="noopener" class="text-[#010A49] hover:opacity-70 transition-opacity">
              {{ project.title }}
              <svg class="inline-block w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </h3>
          {% if project.description %}
          <div class="project-description-container">
            <p class="text-secondaryText text-base font-body mb-2 project-description line-clamp-2">{{ project.description }}</p>
            <button class="text-sm text-[#010A49] hover:opacity-70 transition-opacity project-toggle hidden" aria-label="Toggle description">
              <span class="toggle-text">Read more...</span>
            </button>
          </div>
          {% endif %}
          {% include tag-icons.html tags=project.tags %}
        </div>
        <div class="text-secondaryText text-sm font-body shrink-0">
          {{ project.date | date: "%B %-d, %Y" }}
        </div>
      </div>
    </div>
    {% endfor %}
  </div>
</section>

<hr class="border-t border-cardBorder mb-20">

<!-- Blog Posts Section -->
<section class="mb-20">
  <h2 class="text-[20px] font-body font-medium mb-6 uppercase leading-[122%] tracking-[-0.03em]">Posts</h2>
  {% assign sorted_posts = site.posts | sort: "date" | reverse %}
  {% if sorted_posts.size > 0 %}
  <div class="space-y-4">
    {% for post in sorted_posts %}
    <div class="bg-white border border-cardBorder rounded p-6 hover:shadow-md transition-shadow">
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div class="flex-1">
          <h3 class="text-xl font-body font-medium mb-1">
            <a href="{{ site.baseurl }}{{ post.url }}" class="text-[#010A49] hover:opacity-70 transition-opacity">
              {{ post.title }}
            </a>
          </h3>
          {% if post.excerpt %}
          <p class="text-secondaryText text-base font-body mb-2 line-clamp-2">{{ post.excerpt | strip_html | truncate: 160 }}</p>
          {% endif %}
          {% include tag-icons.html tags=post.tags %}
        </div>
        <div class="text-secondaryText text-sm font-body shrink-0">
          {{ post.date | date: "%B %-d, %Y" }}
        </div>
      </div>
    </div>
    {% endfor %}
  </div>
  {% else %}
  <p class="text-lg text-secondaryText font-body">No posts yet. Check back soon!</p>
  {% endif %}
</section>

{% include footer-cta.html %}
