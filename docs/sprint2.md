---
layout: post
title: Sprint 2
description: Migrating and mapping content
includeInBreadcrumbs: true
date: 2025-10-15
author: Application Capability Framework delivery team at SCW
---

## Investigating how DCF could map to OAM service types

The team needed to develop an intial map from DCF ato OAM's service types. But these weren't populated yet in the OAM metamodel so the team looked at the [NHS data dictionary](https://www.datadictionary.nhs.uk/). However, it wasn't easy to get a list of which NHS business descriptions are also services. 

The team referred back to the archived NHS data dictionary [treatment function codes](/treatment-function-codes/) for comparison. This list looked much more comprehensive - but on closer examination was not nested consistently. The team took this away for further review and investigation.

## Importing application capability types

As well as Acute (also referred to as 'Core' or 'Foundation' and typically referring to hospital trusts) DCF has separate 'products' for different care settings:

1. Community
2. Mental health
3. Ambulance
4. Maternity

The discovery highlighted that users didn't always understand how or where to access these separate 'products'. Language and presentation were confusing for some:

> ‘I was a little bit confused… because I think when you first did [DCF], you didn't have maternity. So I was looking in community for my community midwives’

The team imported Maternity and Ambulance user stories, mapped to application capabilities. In this process, it became clear that these products had been developed separately - for example, Ambulance is not mapped to Application Functions.
