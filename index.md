---
layout: default
title: Technology, Charity & Open Source
id: home
---

{% include header.html %}

<!-- Hero Section -->
<header class="mb-16">
  <div class="grid md:grid-cols-2 gap-12 mb-16">
    <div class="flex flex-col justify-between">
      <h1 class="text-[60px] font-display font-medium mb-8 leading-[97%] tracking-[-0.03em]">Hi, I'm James Inman.</h1>
      <div class="flex items-center h-[48px]">
        <a href="#about-section" class="text-[#010A49] hover:opacity-70 transition-opacity cursor-pointer" aria-label="Scroll to about section">
          <svg width="28" height="44" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M14 0L14 36M14 36L8 30M14 36L20 30" stroke="currentColor" stroke-width="3.5"/>
          </svg>
        </a>
      </div>
    </div>
    <div class="flex flex-col justify-between">
      <p class="text-[32px] text-secondaryText font-sans font-normal mb-6 leading-[1.55] tracking-[-0.03em]">
        I <strong>build software</strong>, contribute to <strong>open source</strong>, and use technology to support <strong>charities</strong> and the people they serve — with over 15 years of experience in engineering, leadership, psychology and mental health.
      </p>
      <div class="flex gap-4">
        <a href="{{ site.baseurl }}/latest"
          class="inline-block bg-[#010A49] hover:opacity-90 text-white font-medium py-3 px-6 font-body text-base transition-all hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryText"
          data-plausible-event="See My Work (Home)">
          See my work →
        </a>
        <a href="mailto:james@jamesinman.co.uk"
          class="inline-block text-[#010A49] hover:opacity-70 py-3 px-6 font-body text-base transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryText"
          data-plausible-event="Email Click (Home)">
          Get in touch →
        </a>
      </div>
    </div>
  </div>
</header>

<!-- Photo and About Section -->
<section id="about-section" class="grid md:grid-cols-2 gap-12 mb-20 items-start">
  <div>
    <img src="{{ site.baseurl }}/assets/images/headshot.jpg" alt="James Inman - portrait photo" class="w-full h-[400px] object-cover rounded" />
  </div>
  <div class="flex flex-col justify-center gap-8 h-[400px]">
    <p class="text-lg text-secondaryText font-body font-normal leading-[1.55]">
      I'm a software engineer and technical leader with over 15 years of experience building products, leading teams, and shipping code. I've founded companies, held Board‑level roles in PE‑backed businesses, and recently, I've built the technology behind <a href="https://neurobetter.org" class="text-primaryText font-medium underline hover:opacity-70">neurobetter</a> — a charity I co‑founded to support neurodivergent people struggling with their mental health.
    </p>
    <p class="text-lg text-secondaryText font-body font-normal leading-[1.55]">
      Today, I help organisations make the most of technology, build open‑source tools, and figure out what to actually do with AI – from strategy to build.
    </p>
    <p class="text-lg text-secondaryText font-body font-normal leading-[1.55]">
      I'm also training in psychodynamic psychotherapy, because understanding how people think matters as much as how systems work.
    </p>
  </div>
</section>

<hr class="border-t border-cardBorder mb-20">

<!-- What I Build Section -->
<section class="grid md:grid-cols-2 gap-12 mb-20 items-center">
  <div>
    <h2 class="text-[20px] font-body font-medium mb-4 uppercase leading-[122%] tracking-[-0.03em]">WHAT I BUILD</h2>
    <p class="text-lg text-secondaryText font-body mb-4 leading-relaxed">
      I work primarily with Ruby, Rails, JavaScript, and TypeScript — building everything from developer tools and API integrations to full SaaS platforms. I contribute to open source, maintain published gems, and care deeply about code quality, testing, and infrastructure.
    </p>
    <p class="text-lg text-secondaryText font-body mb-6 leading-relaxed">
      Recent work includes an open‑source CMS, charity website auditing tools, MCP server integrations, and DNS tooling adopted into Homebrew. I write about the things I learn along the way.
    </p>
    <a href="{{ site.baseurl }}/latest" class="inline-block bg-white border border-[#010A49] hover:bg-gray-50 text-[#010A49] font-medium py-3 px-6 font-body text-base transition-all hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryText" data-plausible-event="What I Build Learn More">See recent projects →</a>
  </div>
  <div>
    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" alt="Team collaborating on a technology project" class="w-full h-[400px] object-cover rounded" />
  </div>
</section>

<hr class="border-t border-cardBorder mb-20">

<!-- Neurobetter Section -->
<section class="grid md:grid-cols-2 gap-12 mb-20 items-center">
  <div class="md:order-2">
    <h2 class="text-[20px] font-body font-medium mb-4 uppercase leading-[122%] tracking-[-0.03em]">NEUROBETTER</h2>
    <p class="text-lg text-secondaryText font-body mb-4 leading-relaxed">
      I'm the Founder of neurobetter, a registered charity supporting neurodivergent people with their mental health. I built the technology platform from scratch and lead both the technical direction and the charity's governance as a trustee.
    </p>
    <p class="text-lg text-secondaryText font-body mb-6 leading-relaxed">
      neurobetter provides training, resources, and advocacy grounded in lived experience and evidence‑based practice — helping both individuals and the organisations that support them.
    </p>
    <a href="https://neurobetter.org" target="_blank" rel="noopener" class="inline-block bg-white border border-[#010A49] hover:bg-gray-50 text-[#010A49] font-medium py-3 px-6 font-body text-base transition-all hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryText" aria-label="Learn more about neurobetter (opens in new window)">
      Learn more
      <svg class="inline-block w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
      </svg>
    </a>
  </div>
  <div class="md:order-1 bg-[#010A49] flex items-center justify-center h-[400px] rounded p-12">
    <img src="{{ site.baseurl }}/assets/images/neurobetter-logo.png" alt="neurobetter logo" class="h-24 object-contain" />
  </div>
</section>

<hr class="border-t border-cardBorder mb-20">

<!-- Tech For Good Section -->
<section class="grid md:grid-cols-2 gap-12 mb-20 items-center">
  <div>
    <h2 class="text-[20px] font-body font-medium mb-4 uppercase leading-[122%] tracking-[-0.03em]">TECH FOR GOOD</h2>
    <p class="text-lg text-secondaryText font-body mb-4 leading-relaxed">
      Through <a href="https://otaina.co.uk" target="_blank" rel="noopener" class="text-primaryText font-medium underline hover:opacity-70">Otaina</a>, I partner with charities, non‑profits, and purpose‑driven organisations to untangle complex systems and make technology work — offering practical strategy and hands‑on delivery.
    </p>
    <p class="text-lg text-secondaryText font-body mb-6 leading-relaxed">
      Whether you need clarity on your digital direction, someone to rescue a development project, or practical support with information security and sensitive data, I can help.
    </p>
    <a href="https://otaina.co.uk" target="_blank" rel="noopener" class="inline-block bg-white border border-[#010A49] hover:bg-gray-50 text-[#010A49] font-medium py-3 px-6 font-body text-base transition-all hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryText" aria-label="Learn more about Tech For Good (opens in new window)">
      Learn more
      <svg class="inline-block w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
      </svg>
    </a>
  </div>
  <div>
    <img src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&h=600&fit=crop" alt="People working together on a community technology project" class="w-full h-[400px] object-cover rounded" />
  </div>
</section>

<hr class="border-t border-cardBorder mb-20">

<!-- Mentoring & Coaching Section -->
<section class="grid md:grid-cols-2 gap-12 mb-20 items-center">
  <div class="md:order-2">
    <h2 class="text-[20px] font-body font-medium mb-4 uppercase leading-[122%] tracking-[-0.03em]">MENTORING & COACHING</h2>
    <p class="text-lg text-secondaryText font-body mb-4 leading-relaxed">
      Alongside my technical work, I mentor and coach people navigating technology leadership, neurodiversity, and career transitions — drawing on lived experience of late diagnosis, founding companies, and rebuilding after setbacks.
    </p>
    <p class="text-lg text-secondaryText font-body mb-6 leading-relaxed">
      Whether you're working out your next career steps, understanding your ADHD or autism, or need someone who genuinely gets it, I can help you find perspective and make a plan.
    </p>
    <a href="{{ site.baseurl }}/neurodiversity-coaching-and-technology-mentoring" class="inline-block bg-white border border-[#010A49] hover:bg-gray-50 text-[#010A49] font-medium py-3 px-6 font-body text-base transition-all hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryText" data-plausible-event="Mentoring Learn More">Learn more →</a>
  </div>
  <div class="md:order-1">
    <img src="https://images.unsplash.com/uploads/14122810486321888a497/1b0cc699?w=800&h=600&fit=crop" alt="Two people having a mentoring conversation" class="w-full h-[400px] object-cover rounded" />
  </div>
</section>

<hr class="border-t border-cardBorder mb-20">

<!-- Experience & Memberships Section -->
<section class="mb-20">
  <h3 class="text-[20px] font-body font-medium mb-6 uppercase leading-[122%] tracking-[-0.03em]">Experience & Memberships</h3>
  <div class="grid md:grid-cols-2 gap-x-12 gap-y-2">
    <ul class="text-secondaryText text-base space-y-2 list-disc pl-5">
      <li class="pl-2">Member of the British Computer Society (MBCS)</li>
      <li class="pl-2">Member of the Royal Society of Public Health (MRSPH)</li>
      <li class="pl-2">Student Member of the British Psychological Society (BPS)</li>
      <li class="pl-2">Student Member of the British Association for Counselling and Psychotherapy (BACP)</li>
      <li class="pl-2">Do-IT Neurodiversity Champion</li>
    </ul>
    <ul class="text-secondaryText text-base space-y-2 list-disc pl-5">
      <li class="pl-2">MA in Couple and Individual Psychodynamic Psychotherapy <span class="text-sm">(in progress)</span></li>
      <li class="pl-2">MSc Psychology</li>
      <li class="pl-2">LLB (Hons) undergraduate degree in Law</li>
      <li class="pl-2">CertHE in Web Applications Development</li>
      <li class="pl-2">CertHE in Software Engineering</li>
      <li class="pl-2">Level 2 Certificate in Introduction to Counselling</li>
      <li class="pl-2">Level 2 Certificate in Self-Harm and Suicide Awareness and Prevention</li>
    </ul>
  </div>
</section>

{% include footer-cta.html %}
