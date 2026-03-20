---
layout: post
title: Sprint 8
description: Future platform planning
includeInBreadcrumbs: true
date: 2026-03-13
author: Application Capability Framework delivery team at SCW
---

## Themes from user research

User research with v3 and previous prototypes highlighted some key priorities for the team, to make sure DCF remains usable, useful and up-to-date. The team translated its research findings into actionable insight:

### Usable

* position DCF clearly as an NHS service, to address pain points with framework overload and lack of visibility
* present clear guidance on how and when to use DCF, to address a lack of understanding about where and why DCF could be used
* ensure search tools support exploratory and targeted navigation, to support the different types of user and use case in research

> I didn't quite see anything that told me why we have user stories and what the intention is for them. So what am I supposed to get out of user stories?

### Useful

* present clear use cases - eg benchmarking, improvement, optimisation, procurement, mergers - for DCF, to show its continuing value
* reflect the fact that DCF's primary use cases are now benchmarking and optimisation (particularly focused on productivity), and ensure it presents derived tools that help users with these tasks
* focus on how DCF can help Trusts - to address the perception that it is a measurement tool for NHSE, not an improvement tool for Trusts
* provide more practical guidance and shared learning, with a particular focus on user stories and how they can support implementation and optimisation
* support Trusts to use DCF to understand suppliers' offerings and hold them to account in terms of delivering benefits

> All it tells me is what it should do, what it could do. It doesn't tell me which EPRs can do it? Which vendors can do it or can't? So I have no carrot or stick to go to my vendor and say, '[This product] can do this. Why can't you?'

### Up-to-date

* position DCF within the context of modern healthcare delivery - ie how an EPR is interoperable with other systems - to show how it provides capability, not just functionality
* ensure all care settings' unique capabilities are covered, to address the perception that DCF is acute-centred with other care settings being 'bolted on'
* provide last reviewed date on all capabilities, along with a version history, to show that DCF continues to evolve.

> I'm looking at a collective of multiple digital systems and how they deliver capability for me. So something that's very EPR specific; it just doesn't really equate to what goes on in the real world.

## Presenting relevant standards in user stories

Stakeholder engagement suggested that it was important to have a direct link to standards from user stories. However, although the Confluence version of DCF had these links present, they were essentially 'static' as they had been manually created. To fix this and present an up-to-date list of standards, the team:

1. created a canonical list of standards and matched them to user stories in DCF (Business analysts)
2. reviewed this list against the [NHS Standards Directory](https://standards.nhs.uk/) to disambiguate and check URLs (Business analysts)
3. creating a custom post type for standards and importing standards metadata so standards could be tagged to taxonomy terms (Interaction designer)
4. created design options for presenting standards information, referring to user research (Interaction designer)
5. developed a template part for WordPress to add the standards automatically to every `user_story` custom post type (Interaction designer)
6. wrote [guidance on how this was done](/Related-Standards-by-Taxonomy-Guide/) (Content designer/Interaction designer)

The team felt the design could be improved by having a direct link to the NHS Standards Directory instead of to a custom post type. But this would need more work and there is the possiblity that this service could, in future share a platform with the Standards Directory. 

The team decided the working solution was appropriate for the Alpha and focused on providing detailed technical guidance for this feature instead so it could inform future development.

## Future service roadmap

Sprint 8 is the second to last sprint, so the team knew that the alpha could design and test solutions to some of these priorities but not all. Version 4 focused on:

1. content changes to ensure DCF is positioned correctly and has contextual guidance to support new and existing users appropriately
2. retagging Excel-derived DCF capabilities to individual care settings, ie acute, maternity, mental health, community, ambulance rather than acute = 'core' or 'foundation'
3. redeveloping search filters and tags for care settings, plus new derived tools (eg merger comparison tool with priority user stories user research suggested Trusts should focus on)

The team tested these changes to ensure they worked for users, and incorporated other actionable insights into the service roadmap.

[Return to homepage](/)
