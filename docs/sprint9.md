---
layout: post
title: Sprint 9
description: Version 4 alpha and next steps
includeInBreadcrumbs: true
date: 2026-03-20
author: Application Capability Framework delivery team at SCW
---

## Are we beta-ready?

Version 4 of the prototype addressed some of the remaining [issues identified in user research](/sprint8/) to make sure this information service remains usable, useful and up-to-date. Discussions continued about handover formats and next steps. The team carried out an internal, informal self-assessment against the 17 NHS service standard points to decide if the prototype was ready for beta development on an appropriate platform:

1. Understand users and their needs in the context of health and care - the alpha follows a [discovery](/discovery/) and the team has researched users, needs and scenarios (from frontline staff, teams maintaining EPRs and digital leaders).
2. Work towards solving a whole problem for users - the alpha resolves key problems with the DCF (as a directory or information service) identified in discovery and provides foundational research for derived products (eg priority test scripts for EPR optimisation in a particular care setting or context) that will enable user-centred products and services to be easily developed
3. Provide a joined up experience across all channels - although this is a digital information service, it provides a basis for products to be developed in digital and non-digital channels
4. Make the service simple to use - this was a key focus of the team's 'test, learn, iterate' approach, and the design has changed considerably as a result of usability testing
5. Make sure everyone can use the service - unusually for an alpha, the rapid prototype was reasonably accessible as it was built using the Nightingale theme but additional work at beta would be needed
6. Create a team that includes multidisciplinary skills and perspectives - the alpha was developed by a multi-disciplinary team including UCD roles, BAs, Delivery, Technical and Product
7. Use agile ways of working - the team worked in agile sprints and was able to pivot and reprofile in response to changing requirements or insights from research
8. Iterate and improve frequently - the alpha prototype was built in a way that enabled it to be iterated and improved easily, with content being created from import scripts and custom code to avoid the need for manual editing
9. Create a secure service which protects people's privacy - the prototype was password protected and the team had roles-based access permissions
10. Define what success looks like and be open about how your service is performing - the alpha has full analytics capability and the team created target user journeys which can be used as a basis for analytics at beta
11. Choose the right tools and technology - the team [explained its choice of WordPress](/sprint1/) and the alpha has been designed to be platform-agnostic, ie easily replatformed
12. Make new source code open - the team shared its approach and the various ways it extended WordPress, including with the NHS Nightingale community of practice
13. Use and contribute to open standards, common components and patterns - the team has used NHS frontend design patterns and components, via Nightingale and custom css, aiming for consistency with similar information services like [the NHS Standards Directory](https://standards.nhs.uk/) which have been extensively tested with users
14. Operate a reliable service - hosting and downtime are less of a concern for the alpha but the WordPress site uses caching and indexing to ensure good performance
15. Support a culture of care - the team carried out research in a range of care settings with people using and maintaining EPRs and took a participatory co-design approach to stakeholder engagement
16. Make your service clinically safe - whilst the alpha would not be used in direct care, content for specific care settings was developed with clinical input from the outset
17. Make your service interoperable - WordPress has APIs and can connect to other services, but as a directory of EPR application capabilities it is aligned to the OAM and therefore supports the wider interoperability agenda

Overall, the team felt comfortable that it would be able to tell its story well at assessment if required. 

## Developing derived products

Following a meeting with the Frontline digitisation team on 9 March, the team sent through the Excel spreadsheet tool they had developed for Trusts to self-assess progress against Frontline digitisation requirements (following investment). This tool was based on the Excel version of DCF and was widely used. Functionality within the spreadsheet allowed users to select their trust from a drop-down list and automatically see all relevant DCF capabilities for their care setting (eg Acute+Maternity) with a series of questions (some of which were conditional, ie may or may not need to be completed based on previous responses).

The team built a rapid prototype using a short Gravity form which used the same conditional logic. This could be repeated - or, importantly, answers replicated - for each of the 8 categories. Users had a dashboard which showed progress and could download their results in Excel.

However, selecting care setting was problematic because of an underpinning issue with DCF that the team had already identified through its research and stakeholder engagement – namely that ‘minimum’ and ‘acute’ had become conflated. Although the FD team had built functionality into the tool that automatically selected their care setting (eg Acute+Maternity), some capabilities in Acute weren’t applicable to other care settings so it wasn’t a true minimal set of capabilities.

For the alpha, this meant that search filters and derived tools were much harder to develop because to show, for example, all capabilities relating to a maternity care setting would involve selecting both ‘acute’ and ‘maternity’. Additionally:

* other care settings used different category groupings to Acute
* user stories in Confluence were categorised differently to application capabilities in Excel
* user stories (requirements) held in Confluence used different IDs to application capabilities in Excel, making it hard to match one to the other

This was not intutive for users so the team knew it needed to do the work to make this simple for them, as well as making it easier to develop derived products such as comparison tools.

The team BAs worked with technical SMEs to resolve this issue, documenting its reasoning and uploading revised, retagged data to the prototype in Sprint 9. This involved reviewing every single application capability and considering which care setting(s) it related to, so it wasn't an easy task but essential.

## Feedback form

Whilst the team would finish its work on 31 March 2026, the NHSE project team asked if it could be kept live (behind a password) so feedback could continue to be collected. The team had a feedback form used in user research (for people who wanted to provide input but weren't able to be interviewed). This was created in MS Forms, so the team initially added the MS forms link.

However, because the Gravity Forms plugin was already installed (used in the self-assessment product), the team decided to recreate the form because:

* it gave the NHSE team full control over the form, going forwards
* Nightingale theme means it could be styled as an NHS form 'out of the box', keeping the user experience consistent
* it allows form submissions to be sent to any email address, downloaded as a spreadsheet for analysis and even presented in reports (using other Gravity plugins and addons)

[Return to homepage](/)
