---
layout: post
title: Sprint 6
description: Prototype testing - alpha version 2
includeInBreadcrumbs: true
date: 2025-12-19
author: Application Capability Framework delivery team at SCW
---

## Developing a working rapid prototype for testing

The team reworked the service proposition in line with user research insights and business requirements from the OAM team in [sprint 5](/sprint5/). This new v2 prototype included:

* a new taxonomy for application functions from DCF confluence
* DCF application functions presented as OAM application capabilities
* cross-linking application functions to the user stories they supported
* DCF user stories organised according to Confluence groupings

The v2 prototype was tested with users (usability testing) with a particular focus on navigation, signposting and task completion.

## User research

User research in sprint 5 consisted of:

1. usability testing with strategic end users (eg CIOs) - 4 sessions
2. stakeholder interviews - 15 completed

## Insights from user research

Emerging themes from user research and stakeholder engagement suggested that the prototype did not yet meet user needs. Specific issues included:

* 'framework overload' - some users weren't clear about DCF's purpose and how it relates to other tools
* lack of relevance/utility - some users see DCF as something that NHSE uses in compliance/oversight and feel it has limited value/usefulness to Trusts
* missing areas of focus - interoperability is seen as essential to modern healthcare delivery but the DCF focuses on EPRs narrowly without considering integration with other systems
* lack of links to good practice - many users said they would like to see examples of how capabilities have been used to drive service improvement and transformation
* use cases have changed - from supporting procurement (eg via [NHSE Frontline Digitisation Programme](https://www.england.nhs.uk/digitaltechnology/digitising-the-frontline/)) to internal monitoring, planning and benchmarking
* over-focus on acute - users in non-acute settings such as maternity felt DCF is less relevant to them and does not acknowledge their unique digital requirements

The majority of participants who said they valued DCF used the Excel version, not Confluence and it was seen as 'the authoritative version'. Additionally the OAM team felt that DCF Confluence Application Functions were not appropriate to become OAM application capabilities and in fact these should be based on the capabilities set out in the Excel version of DCF.

This was significant because the team had seen the Confluence version of DCF as the most recent, up-to-date and detailed source of information - with its links to application functions, standards etc. In fact, users and stakeholders both wanted the Excel version of DCF to be the foundation. This was particularly important for Frontline Digitisation's validation work.

## Changes to the prototype

The team worked together to translate these research findings into actionable insight. A design spike over the Xmas period saw significant changes to core concepts and information architecture to support:

1. DCF Excel as the authoritiative list of OAM application capabilities for secondary care EPRs
2. Identification of candidate OAM-aligned groupings and taxonomies for application capabilities (using extant lists where possible)
3. Mapping DCF capabilities (Excel-sourced) to DCF user stories (Confluence) - in some cases a number of user stories may relate to a single capability
4. Design of new, task-focused content and signposting
5. Mapping DCF user stories from Confluence to Excel-sourced capabilities and creating links programmatically

The team rewrote migration scripts and completely reimported 210 application capabilities, 344 user stories and 148 standards. 

[Return to homepage](/)
