
# Related Standards by Taxonomy — Implementation Guide (NHS Nightingale)

> **Goal:** On each `user_story` single, list related **Standard** posts in an NHS‑styled table, where the relationship is defined by the assigned `standard` taxonomy terms. Match logic: for each assigned term, take the **term Name** (e.g. `STD001`) as the primary key and the **upper‑cased Slug** (e.g. `std001` → `STD001`) as a fallback, then find `standard` posts whose ACF meta **`standard_id`** equals any of those keys. The table is wrapped in an NHS **Expander (plus variant)** titled **“View related standards (N)”**.

> **Context:** Your ACF export shows the field group **“Standards metadata”** is attached to the **`standard` taxonomy** (location rule: `taxonomy == standard`), not to the `standard` CPT. That’s why term data is the authoritative source for relationships from `user_story` → `standard`. citeturn6search1

---

## 1) Create the Template Part

**Path:**
```
wp-content/themes/YOUR-CHILD-THEME/template-parts/user-story/related-standards-by-tax.php
```

**What this file does:**
- Gathers assigned `standard` terms from the current `user_story`.
- Builds a deduplicated list of candidate IDs:
  - **Primary:** `term->name` (e.g. `STD001`)
  - **Fallback:** `strtoupper(term->slug)` (e.g. `std001` → `STD001`)
- Runs a single `WP_Query` against `post_type = standard` where meta `standard_id` equals any candidate key.
- Renders an NHS table with **Standard ID | Title (as a link) | Description**.
- Wraps the whole table in an **NHS Expander** using your provided classes.
- Adds a **count** to the expander label.

```php
<?php
/**
 * Template part: Related Standards by Taxonomy (NHS Expander)
 * CPT: user_story
 * Taxonomy: standard
 * Match keys: term->name (primary), strtoupper(term->slug) (fallback)
 */

if (!defined('ABSPATH')) exit;

$post_id = get_the_ID();

// 1) Get assigned 'standard' terms for this user_story
$terms = get_the_terms($post_id, 'standard');
if (empty($terms) || is_wp_error($terms)) {
  return; // Nothing to show
}

// 2) Build candidate keys from term Name + uppercased Slug
$candidates = array();
foreach ($terms as $t) {
  $name = isset($t->name) ? trim((string) $t->name) : '';
  if ($name !== '') {
    $candidates[$name] = true;
  }

  $slug = isset($t->slug) ? trim((string) $t->slug) : '';
  if ($slug !== '') {
    $candidates[strtoupper($slug)] = true;
  }
}

$keys = array_keys($candidates);
if (empty($keys)) {
  return;
}

// 3) Query 'standard' posts whose meta 'standard_id' matches any key
$meta_query = array('relation' => 'OR');
foreach ($keys as $k) {
  $meta_query[] = array(
    'key'     => 'standard_id',
    'value'   => $k,
    'compare' => '='
  );
}

$q = new WP_Query(array(
  'post_type'      => 'standard',
  'post_status'    => 'publish',
  'posts_per_page' => -1,
  'meta_query'     => $meta_query,
  'orderby'        => 'title',
  'order'          => 'ASC',
  'no_found_rows'  => true,
  'fields'         => 'ids',
));

if (!$q->have_posts()) {
  return;
}

// Count for expander title
$count = (int) $q->post_count;

// Unique ID for aria-controls / id to avoid collisions
$expander_id = 'details-content-related-standards-' . (int) $post_id;
?>

<details class="wp-block-nhsblocks-reveal1 nhsuk-details is-style-expander">
  <summary class="nhsuk-details__summary"
           role="button"
           aria-controls="<?php echo esc_attr($expander_id); ?>"
           aria-expanded="false">
    <span class="nhsuk-details__summary-text">
      <?php echo esc_html( sprintf('View related standards (%d)', $count) ); ?>
    </span>
  </summary>

  <div class="nhsuk-details__text"
       id="<?php echo esc_attr($expander_id); ?>"
       aria-hidden="true">

    <div class="nhsuk-table-responsive">
      <table class="nhsuk-table">
        <thead class="nhsuk-table__head">
          <tr class="nhsuk-table__row">
            <th scope="col" class="nhsuk-table__header">Standard ID</th>
            <th scope="col" class="nhsuk-table__header">Title</th>
            <th scope="col" class="nhsuk-table__header">Description</th>
          </tr>
        </thead>

        <tbody class="nhsuk-table__body">
          <?php foreach ($q->posts as $std_post_id): ?>
            <?php
              // Read fields from the Standard CPT post
              $std_id = function_exists('get_field')
                        ? get_field('standard_id', $std_post_id)
                        : get_post_meta($std_post_id, 'standard_id', true);

              $title  = get_the_title($std_post_id);
              $desc   = function_exists('get_field')
                        ? get_field('standard_description', $std_post_id)
                        : get_post_meta($std_post_id, 'standard_description', true);

              $link   = get_permalink($std_post_id);
            ?>
            <tr class="nhsuk-table__row">
              <td class="nhsuk-table__cell"><?php echo esc_html($std_id); ?></td>
              <td class="nhsuk-table__cell">
                <a class="nhsuk-link" href="<?php echo esc_url($link); ?>">
                  <?php echo esc_html($title); ?>
                </a>
              </td>
              <td class="nhsuk-table__cell"><?php echo esc_html($desc); ?></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>

  </div>
</details>

<?php wp_reset_postdata(); ?>
```

> **Why match via taxonomy term?** Because the “Standards metadata” ACF group targets the **`standard` taxonomy** (not the `standard` CPT). That means the relationship originates from the **terms** you assign to each `user_story`. You then locate the corresponding **Standard** posts via the shared `standard_id` meta. citeturn6search1

---

## 2) Include the Template Part in `single-user_story.php`

Add this line beneath your existing ACF table and content:

```php
<?php
get_template_part( 'template-parts/user-story/user-story-table', null, [ 'post_id' => get_the_ID() ] );

the_content();

// Expander-wrapped related standards table
g e t _ t e m p l a t e _ p a r t( 'template-parts/user-story/related-standards-by-tax' );
?>
```

> Ensure your `user_story` CPT is registered to use the `standard` taxonomy and that each story has at least one **standard** term assigned. Your Site Health + ACF export confirm `user_story` is linked to the `standard` taxonomy, and that the taxonomy stores the metadata. citeturn6search1

---

## 3) Accessibility & Nightingale Notes

- **Expander structure** uses the provided classes and attributes:
  - `<details class="wp-block-nhsblocks-reveal1 nhsuk-details is-style-expander">`
  - `<summary class="nhsuk-details__summary" role="button" aria-controls="…" aria-expanded="false">`
  - `<span class="nhsuk-details__summary-text">View related standards (N)</span>`
  - `<div class="nhsuk-details__text" id="…" aria-hidden="true"> … </div>`
- **Unique IDs**: Use a post‑scoped `id` / `aria-controls` so multiple expanders on a page don’t clash.
- **Table classes**: `nhsuk-table`, `nhsuk-table-responsive`, `nhsuk-table__head`, `nhsuk-table__row`, `nhsuk-table__header`, `nhsuk-table__cell` — consistent with Nightingale styles.

---

## 4) Optional Enhancements

- **Plural‑aware label**

  ```php
  <span class="nhsuk-details__summary-text">
    <?php
      echo esc_html( sprintf(
        _n( 'View related standard (%d)', 'View related standards (%d)', $count, 'nightingale' ),
        $count
      ) );
    ?>
  </span>
  ```

- **Open by default**

  Add `open` to `<details>` and flip ARIA: `aria-expanded="true"` on `<summary>`, `aria-hidden="false"` on the content `<div>`.

- **Admin‑only debug**

  During setup, you can print detected term names/slugs and query results for admins:

  ```php
  if (current_user_can('manage_options')) {
    echo '<pre style="background:#f8f8f8;border:1px solid #ddd;padding:8px">';
    echo "[DEBUG] Terms:\n";
    print_r($terms);
    echo "\n[DEBUG] Candidate keys:\n";
    print_r($keys);
    echo '</pre>';
  }
  ```

---

## 5) Common Pitfalls & Checks

1. **No terms assigned** → nothing renders. Assign one or more **standard** terms to the `user_story`.
2. **Mismatched IDs** → query returns no posts. Ensure Standard posts have ACF/meta `standard_id` matching the **term Name** (e.g., `STD001`) or the upper‑cased Slug (`std001` → `STD001`).
3. **ACF location** → If you later move “Standards metadata” to the **`standard` post type** instead of the taxonomy, you can simplify the logic to read only post meta. Today, the taxonomy is the source. citeturn6search1
4. **Styling anomalies** → Verify there are no unbalanced `<a>` tags in nearby templates; one stray anchor can break layout.

---

## 6) Where this Guide References Your Data

- The fact that **“Standards metadata”** targets the **`standard` taxonomy** (group key `group_6942f1a3d30e7`, location = `taxonomy == standard`) and includes fields like `standard_id`, `standard_description`, and `url` is taken directly from your ACF export JSON. citeturn6search1

---

### Maintenance Tips

- Keep term **Name** in canonical `STD###` format so matching remains predictable.
- When importing Standards, map `standard_id` into the Standard post’s ACF/meta so the join works immediately. If you also keep term‑level metadata, ensure Name/Slug conventions are consistent. citeturn6search1

