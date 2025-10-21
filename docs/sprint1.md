---
layout: post
title: Sprint 1
description: How the team set up a rapid prototype to test with users
includeInBreadcrumbs: true
date: 2025-10-07
author: Application Capability Framework delivery team at SCW
---

## The 'baseline' - a single platform

One of the key user research and engagement findings from the discovery was that the current Digital Capabilities Framework exists on multiple platforms - NHSE Transformation web pages, Confluence and an Excel version hosted on FutureNHS.

> Some Excel users felt DCF held insufficient detail to determine if a supplier could deliver a capability, or for suppliers to build towards. Others, looking at Confluence, viewed DCF as too detailed and not for everyone. 

For the alpha, the team wanted to test its hypothesis that a single unified platform could:

1. address unmet user needs and points of friction in user journeys identified in [the discovery](/discovery/)
2. provide a trusted 'single source of truth'
3. present tailored journeys and tools for different types of user and use cases
4. distinguish between the framework itself and derived products that support specific use cases
5. position secondary care application capabilities as a constituent part of the OAM

## Why WordPress?

The discovery highlighted problems with DCF's structure, navigability, consistency of language and search functionality. The team felt it'd be critical to test these things with users from the outset. Also, the team knew that, as a browser-based service, it would have to be accessible (to WCAG 2.1 AA) and built to either NHS or GOV.UK design patterns. 

This narrowed down its choice of Alpha prototype tooling. Figma and AxureRP were felt to be better for trialling static designs and lower fidelity clickable prototypes, whereas the team wanted to design, test and iterate navigation and categorisation from the outset. Wireframes were also considered - essentially allowing users to focus on new or amended content - but, again, the team felt the way people navigate around the content was the area they needed to test most and static wireframes wouldn't allow that.

Next, the team considered using the NHS prototype kit, or eleventy (the tool used for this design history). Both create NHS-styled websites without needing lots of developer time. However, neither would easily allow us to try out different approaches to information architecture, search and tagging without extra coding. So the team looked at WordPress. Although an unusual option for an alpha, WordPress:

1. provides a fully featured content management system (CMS) which the team's content designers had used before
2. stores content in a relational database which can be readily imported and exported to future platforms
3. can be easily styled to look like an NHS service using the NHS Nightingale theme for WordPress (created by Tony Blacker at NHS Digital Academy)
4. is highly extensible with a variety of plugins available to support taxonomy and/or ontology development, password protection and other functionality the prototype would need (plus the ability to code custom plugins as needed)

## How the site was built

First, the team set up the prototype website. They:

1. bought a domain and added hosting (£14)
2. added wildcard SSL (free)
3. installed Wordpress, the Nightingale theme and its 2 companion plugins
4. set password protection (via Password Protected plugin)
5. added users to defined roles
6. created some pages

Referring to their service designer's initial conceptual model, the team installed some more plugins:

* ACF (Advanced Custom Fields) to set custom post types ('User Story'), field groups and taxonomies
* AlphaListing plugin for A-Z listing
* FacetWP (for advanced search with facets)
* Timeline block (for a visual service roadmap)
* WP All Import and its ACF add-on to allow easy import of Confluence content
* Redirection - to redirect 'archive' pages to WP Facet pages
* Nested pages - to make it easier to nest pages in the WP admin dashboard

The team also wrote a couple of custom plugins to control content in each Application Capability's User Story, pulling in custom field group content and DCF Application Function content via shortcodes, and allowing a list of all application functions to be displayed, with a column showing all the Application Capabilities each Application Function applied to and the ability to download as CSV or Excel. This was informed by likely requirements identified in Discovery.

## Investigating how DCF could map to OAM classes

The team needed to develop an intial map from DCF across to OAM classes with a read across to OAM's service types. But these weren't populated yet in the OAM metamodel so the team looked at the [NHS data dictionary](https://www.datadictionary.nhs.uk/). However, it wasn't easy to get a list of which NHS business descriptions are also services. 

The team referred back to the [archived NHS data dictionary](/treatment-function-codes/) treatment function codes for comparison. This list looked much more comprehensive - but on closer examination was not nested consistently. The team took this away for further review and investigation.

[Back to homepage](/)
