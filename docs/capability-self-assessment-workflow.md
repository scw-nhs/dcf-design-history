
# NHS Capability Assessment Workflow — Technical Documentation (v6.4.0)

**Author:** SCW CSU (Sam Brierley)) 
**Date:** 2026-03-10  
**Scope:** WordPress + Gravity Forms + ACF + Nightingale (NHS.UK)  
**Plugin filename:** `nhs-capability-assessment.php`  
**Current plugin version:** **v6.4.0**

---

## 1) Executive Summary
This document captures the end‑to‑end journey we followed to design and build a **capability assessment workflow** for EPR capabilities using WordPress, **Gravity Forms**, **ACF** and the **Nightingale** theme. The final solution uses:

- A **master Assessment form** (Form **ID 2**) to create an “Assessment” record (Assessment ID).  
- A **Capability form** (Form **ID 1**) that a user completes once **per capability**.  
- A **Dashboard** page (shortcode) that lists the 8 DCF capability groups and progress.  
- A **Section** page (shortcode) that lists all capabilities in a group with **Start | Edit | Duplicate answers** actions.  
- A **Duplicate** page (shortcode) to copy answers to multiple capabilities in the same section.  
- A **clean URL router** to provide friendly URLs, while rendering inside the Nightingale theme via shortcodes.  
- An **export** endpoint that provides an Excel‑compatible CSV of all capabilities in an Assessment.

Key to the workflow is the persistent context saved on every Capability entry:

| Form 1 hidden field | Field ID | Purpose | Example |
|---|---:|---|---|
| `capability_slug` | **43** | Links the entry to a specific capability | `create-patient-record-1-01` |
| `dcf_category` | **44** | Human‑readable DCF group name | `Storage and Management of Records Assessments and Plans` |
| `dcf_category_description` | **45** | Group/capability description | `Supporting the capture…` |
| `assessment_id` | **46** | Links the entry to the Assessment (Form 2 entry ID) | `14` |

These four fields drive the **status** (“Not started / In progress / Completed”) and power the routing, edit, duplicate and export features.

---

## 2) Final User Journey (as implemented)

1. **Start a new assessment**  
   The user opens `/assess-epr-capability/` and submits **Form 2** (organisation name/type). On submit, the plugin redirects to:
   
   ```
   /assessment/{assessment_id}/dashboard
   ```

2. **Dashboard**  
   Renders within the Nightingale theme via the page **`/assessment-dashboard/`** using the shortcode `[nhs_assessment_dashboard]`. Shows Assessment details and an NHS‑style table for the **8 DCF categories** with a **View capabilities** link.

3. **Section view**  
   Clicking **View capabilities** loads **`/assessment-section/`** with `[nhs_assessment_section]`. The table lists all capabilities in that section, **sorted by ACF field `id`** (e.g., 1.01 → 1.02 → …). Actions: **Start** or **Edit | Duplicate answers**.

4. **Start a capability**  
   Selecting **Start** routes to:
   
   ```
   /assessment/{assessment_id}/section/{section_slug}/capability/{capability_slug}/start
   ```
   The router maps this to **`/capability-form/`** where **Form 1** is embedded. The plugin injects a header above the form with capability title/description and organisation details.

5. **Save a capability**  
   On submit, **Form 1** saves context fields (43/44/45/46) and redirects back to the Section page. The row changes to **Completed**.

6. **Edit a capability**  
   Clicking **Edit** loads Form 1 prefilled; on submit the plugin **overwrites** the original entry (no duplicate rows) and returns to the Section table (status remains **Completed**).

7. **Duplicate answers**  
   Clicking **Duplicate answers** opens a list of other capabilities in the same section. The user ticks targets and confirms; the plugin creates new entries **carrying over all answers and context** (43/44/45/46). Redirects back to the Section page.

8. **Export**  
   From the Dashboard, **Download responses (Excel CSV)** produces a CSV of all capability entries for the given Assessment ID.

---

## 3) Architecture Overview

### 3.1 Clean URL router (rewrite rules)
We expose human‑readable routes like `/assessment/{id}/dashboard` and map them to internal shortcode pages:

- `/assessment/{id}/dashboard` → `/assessment-dashboard/?assessment_id={id}`  
- `/assessment/{id}/section/{section}` → `/assessment-section/?assessment_id={id}&section={section}`  
- Capability start/edit/duplicate → redirected to `/capability-form/` with query string context.

### 3.2 Shortcodes (Nightingale‑styled)
Three shortcodes render inside standard WP pages so the Nightingale header/footer/CSS apply:

- `[nhs_assessment_dashboard]`
- `[nhs_assessment_section]`
- `[nhs_assessment_duplicate]`

### 3.3 Data model (Gravity Forms)
- **Form 2 (ID 2):** creates the Assessment (entry ID is the Assessment ID).  
- **Form 1 (ID 1):** one entry per capability; hidden fields 43/44/45/46 store context; status and export are computed from these fields.

### 3.4 Status logic
A capability is **present** (thus **Completed**) for an Assessment when **both** are found in the same Form 1 entry:

- Field **46** (`assessment_id`) equals `{assessment_id}`  
- Field **43** (`capability_slug`) equals `{capability_slug}`

### 3.5 Export
CSV headers are derived from Form 1 labels, with additional columns for **Capability** (title) and **DCF category**.

---

## 4) Development Journey — Key Decisions & Fixes

### 4.1 Initial approach
- Began with a single reusable Capability form and query‑string context (`capability_slug`, `dcf_category`, etc.).
- Implemented **clean URL routing** and pre‑population of hidden fields.

### 4.2 Nightingale styling issue (unstyled dashboard)
- Early versions rendered HTML in `template_redirect` (echo + exit), which **bypassed the theme**.  
- **Fix:** moved rendering to **shortcodes embedded in real pages**, so Nightingale CSS loads.

### 4.3 Slug mismatch causing critical error
- A single character typo (`plan` vs `plans`) caused section lookup to fail.  
- **Fix:** implemented **`nhs_fix_section_slug()`** to normalise/auto‑correct slugs before use.

### 4.4 Edit didn’t update status
- Editing created a new entry but the Section table remained **Not started**.  
- **Fix:** added a true **overwrite flow**: after submit, copy values onto the original entry ID and delete the temp row.

### 4.5 Hidden context fields saving as blank
- Entries showed blank fields for IDs 43/44/45/46 due to dynamic population not being configured or query strings being stripped at submit.  
- **Fix (v6.3.0 → v6.4.0):**
  - **Pre‑render defaults:** set `defaultValue` for IDs 43/44/45/46 from the URL.
  - **Form‑specific pre‑submission:** write values into `$_POST[input_{id}]` so GF persists them.  
  - **Global pre‑submission:** second safety net for any form.  
  - **Post‑save patch:** immediately fix a just‑saved entry if any of the four fields are still blank.

The combination guarantees context is stored even if admin settings are incomplete or if a caching layer strips query strings.

---

## 5) Installation & Configuration

### 5.1 Pages
Create three pages and insert the shortcodes:

- `/assessment-dashboard/` → `[nhs_assessment_dashboard]`
- `/assessment-section/` → `[nhs_assessment_section]`
- `/assessment-duplicate/` → `[nhs_assessment_duplicate]`

### 5.2 Forms

**Form 2 (Assessment – ID 2):**
- Fields for **Organisation name** (`org_name` recommended) and **Organisation type** (`org_type` recommended).  
- Confirmation is handled by the plugin → redirects to `/assessment/{id}/dashboard`.

**Form 1 (Capability – ID 1):**
- Add/confirm 4 **Hidden** fields with **these IDs** (IDs must match):
  - **43** → `capability_slug` (recommended: enable dynamic populate, Parameter Name `capability_slug`)
  - **44** → `dcf_category` (Parameter Name `dcf_category`)
  - **45** → `dcf_category_description` (Parameter Name `dcf_category_description`)
  - **46** → `assessment_id` (Parameter Name `assessment_id`)
- The plugin forces values for these fields even if dynamic population is not configured, but configuring it is best practice.

### 5.3 Permalinks
After activation or updates to routes, go to **Settings → Permalinks → Save** to flush rewrites.

---

## 6) URL Map (public → internal)

| Public URL | Purpose | Internal mapping |
|---|---|---|
| `/assessment/{id}/dashboard` | Assessment overview | `/assessment-dashboard/?assessment_id={id}` |
| `/assessment/{id}/section/{section}` | Section listing | `/assessment-section/?assessment_id={id}&section={section}` |
| `/assessment/{id}/section/{section}/capability/{cap}/start` | Start capability | `/capability-form/?assessment_id={id}&section_slug={section}&capability_slug={cap}&dcf_category=...&dcf_category_description=...` |
| `/assessment/{id}/section/{section}/capability/{cap}/edit/{entry}` | Edit capability | same as Start + `&edit={entry}` |
| `/assessment/{id}/section/{section}/capability/{cap}/duplicate/{entry}` | Duplicate answers | `/assessment-duplicate/?assessment_id={id}&section={section}&entry_id={entry}&capability_slug={cap}` |
| `/assessment/{id}/export` | CSV export | direct output |

---

## 7) Implementation Highlights

### 7.1 Capability form header (context)
At `/capability-form/`, the plugin injects a header above **Form 1** showing:
- Capability title and excerpt  
- Organisation name/type (from Assessment)

### 7.2 Edit overwrite flow
On **Edit**, the new submission is copied back onto the **original entry ID**, preserving `created_by`. This avoids duplicate rows and keeps status logic stable.

### 7.3 Duplicate answers
Creates new entries for selected capabilities in the same section, carrying over all answers and setting the four context fields.

### 7.4 Status computation
`nhs_cap_status(assessment_id, capability_slug)` calls `GFAPI::get_entries()` with filters on **ID 46** and **ID 43**. If an entry exists, the row is **Completed**; otherwise **Not started**. Section totals drive **Not started / In progress / Completed** at the section level.

### 7.5 Export
Builds a CSV where the first two columns are **Capability title** (from CPT) and **DCF category** (field 44). Remaining columns mirror Form 1 labels.

---

## 8) Troubleshooting

- **404 on dashboard/section URLs** → Flush permalinks (Settings → Permalinks → Save).  
- **Unstyled table** → Ensure dashboard/section/duplicate render inside real pages via shortcodes; don’t echo HTML in `template_redirect`.  
- **Critical error on Start/Edit** → Check for section slug typos; v5+ includes auto‑correction.  
- **Status stays “Not started”** → Confirm Form 1 entries have **field 43** and **field 46** populated. In v6.4.0 this is forced; if still blank, verify `/capability-form/` has the Gravity Form **ID 1** shortcode.  
- **No org details on header** → Ensure Form 2 saved values and the Assessment ID is present in the URL when opening `/capability-form/`.

**Diagnostics:** enable `[nhs_gf_diag]` on `/capability-form/` to print incoming GET values for the four context fields. Toggle with `NHS_DIAG_ENABLED`.

---

## 9) Security & Performance Notes

- Consider gating access to dashboard/section/duplicate pages behind `is_user_logged_in()` (the shortcode approach makes it simple to add).  
- Gravity Forms entries will grow with usage; consider archiving older assessments or using GravityKit/Views for reporting at scale.  
- Keep Nightingale assets loaded by rendering inside pages; avoid raw output in routers.  
- Disable diagnostics (`NHS_DIAG_ENABLED`) in production.

---

## 10) Changelog (high‑level)

- **v3.0.0** — Initial assessment + dashboard + section + capability routing; basic export.  
- **v4.0.0** — Moved rendering to shortcodes (fixed Nightingale styling).  
- **v5.0.0** — Slug normalisation to prevent critical errors on section routes.  
- **v6.0.0** — True edit overwrite logic (no duplicate rows).  
- **v6.2.0** — Wired field IDs 43 (capability) & 46 (assessment); status computed from these IDs.  
- **v6.3.0** — Forced defaults & form‑specific pre‑submission to persist hidden fields; post‑save safety.  
- **v6.4.0** — Added global pre‑submission safety net, consolidated post‑save patch, optional diagnostics.

---

## 11) Next Steps / Enhancements (optional)
- NHS Tags for **Completed / In progress / Not started** badges.  
- Breadcrumbs across Dashboard → Section → Capability.  
- True **.xlsx** export via `phpoffice/phpspreadsheet`.  
- Per‑section “Mark complete” rules (e.g., mandatory capabilities).  
- Multi‑assessment history per user and role‑based access.

---

## 12) Quick Setup Checklist

- [ ] Upload plugin `nhs-capability-assessment.php` to `/wp-content/plugins/` and **Activate**.  
- [ ] Create pages & insert shortcodes:
  - [ ] `/assessment-dashboard/` → `[nhs_assessment_dashboard]`
  - [ ] `/assessment-section/` → `[nhs_assessment_section]`
  - [ ] `/assessment-duplicate/` → `[nhs_assessment_duplicate]`
- [ ] Place **Form 2** on `/assess-epr-capability/` and **Form 1** on `/capability-form/`.  
- [ ] In **Form 1**, confirm hidden fields exist with IDs **43/44/45/46** (set Parameter Names if possible).  
- [ ] **Save Permalinks** to flush rewrites.  
- [ ] Test: Start → Submit → Section shows **Completed** → Edit → Duplicate → Export.

---