import { access, readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { test } from "node:test";
import assert from "node:assert/strict";
import { comments, posts, projects, site } from "../src/site-data.mjs";

const projectRoot = resolve(import.meta.dirname, "..");
const outputRoot = join(projectRoot, "dist");
const pageExpectations = [
  {
    file: "index.html",
    hrefs: ["./", "./projects/", "./blog/", "./blog/hello-world/", site.github, site.discord, `mailto:${site.email}`],
  },
  {
    file: "projects/index.html",
    hrefs: ["../", "./", "../blog/", site.github, site.discord, `mailto:${site.email}`],
  },
  {
    file: "blog/index.html",
    hrefs: ["../", "../projects/", "./", "./hello-world/", site.github, site.discord, `mailto:${site.email}`],
  },
  {
    file: "blog/hello-world/index.html",
    hrefs: ["../../", "../../projects/", "../", site.github, site.discord, `mailto:${site.email}`],
  },
];

function extractHrefs(html) {
  return [...html.matchAll(/\bhref="([^"]+)"/g)].map((match) => match[1]);
}

function localPageTarget(fromFile, href) {
  if (
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("#") ||
    href.startsWith("/assets/") ||
    href === "/styles.css"
  ) {
    return null;
  }

  const base = dirname(join(outputRoot, fromFile));
  const target = resolve(base, href);
  return href.endsWith("/") ? join(target, "index.html") : target;
}

test("generated pages use the expected internal routes and compact navigation", async () => {
  for (const { file, hrefs: expectedHrefs } of pageExpectations) {
    const html = await readFile(join(outputRoot, file), "utf8");
    const hrefs = extractHrefs(html);
    const nav = html.match(/<nav[^>]*>[\s\S]*?<\/nav>/)?.[0] ?? "";

    for (const expectedHref of expectedHrefs) {
      assert.ok(hrefs.includes(expectedHref), `${file} should include href="${expectedHref}"`);
    }

    assert.doesNotMatch(html, /href="[^\"]*profile\//);
    assert.doesNotMatch(nav, />LinkedIn<|>X</);
    assert.match(html, /class="nav-separator" aria-hidden="true"/);
    assert.match(html, /class="nav-icon" href="https:\/\/github\.com\/omgyukiel" aria-label="GitHub"/);
    assert.match(html, new RegExp(`class="nav-icon" href="${site.discord.replaceAll("/", "\\/")}" aria-label="Discord"`));
    assert.match(html, new RegExp(`class="nav-icon" href="mailto:${site.email}" aria-label="Email"`));
  }
});

test("generated internal links stay inside the public artifact and resolve", async () => {
  for (const { file } of pageExpectations) {
    const html = await readFile(join(outputRoot, file), "utf8");

    for (const href of extractHrefs(html)) {
      assert.equal(
        /(?:^|[./])Users\/|\/personal-site\//.test(href),
        false,
        `${file} has filesystem-looking href="${href}"`,
      );

      const target = localPageTarget(file, href);
      if (target) await access(target);
    }
  }
});

test("homepage renders only the intro and no more than three newest posts", async () => {
  const html = await readFile(join(outputRoot, "index.html"), "utf8");
  const renderedPosts = [...html.matchAll(/class="post-row"/g)];
  const expectedPosts = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  assert.equal(renderedPosts.length, expectedPosts.length);
  for (const post of expectedPosts) {
    assert.match(html, new RegExp(`href="[^\"]*${post.slug}/"`));
  }

  assert.doesNotMatch(html, /class="project-row"/);
  assert.doesNotMatch(html, />Projects<\/h2>/);
  assert.match(html, /class="contact-line" aria-label="Contact links"/);
  assert.match(html, new RegExp(`href="mailto:${site.email}"`));
  assert.match(html, new RegExp(site.linkedIn.replaceAll("/", "\\/")));
  assert.match(html, new RegExp(site.discord.replaceAll("/", "\\/")));
});

test("projects page renders every configured project", async () => {
  const html = await readFile(join(outputRoot, "projects/index.html"), "utf8");

  for (const project of projects) {
    assert.match(html, new RegExp(project.href.replaceAll("/", "\\/")));
    assert.ok(html.includes(project.title));
    assert.ok(html.includes(project.description));
    assert.ok(html.includes(project.meta));
  }
});

test("external HTTP links are isolated and email uses mailto", async () => {
  for (const { file } of pageExpectations) {
    const html = await readFile(join(outputRoot, file), "utf8");
    const externalAnchors = [...html.matchAll(/<a\s+[^>]*href="https?:\/\/[^\"]+"[^>]*>/g)];

    for (const [anchor] of externalAnchors) {
      assert.match(anchor, /target="_blank"/);
      assert.match(anchor, /rel="noopener noreferrer"/);
    }

    assert.match(html, new RegExp(`href="mailto:${site.email}"`));
  }
});

test("deployment artifact contains only the public boundary", async () => {
  for (const path of [
    ".nojekyll",
    "CNAME",
    "styles.css",
    "assets/ArialPixel.ttf",
    "assets/cs16.min.css",
    "assets/mark.svg",
    "assets/profile-office.jpg",
    "projects/index.html",
  ]) {
    await access(join(outputRoot, path));
  }

  await assert.rejects(access(join(outputRoot, "profile", "index.html")));
  await assert.rejects(access(join(outputRoot, "archive", "pre-minimal-redesign", "index.html")));
});

test("blog posts include the configured giscus comments shell", async () => {
  const html = await readFile(join(outputRoot, "blog/hello-world/index.html"), "utf8");

  assert.match(html, /class="comments-panel"/);
  assert.match(html, /match chat/);
  assert.match(html, /de_hello_world/);
  assert.match(html, /data-comment-player-count="hello-world"/);

  if (comments.categoryId) {
    assert.match(html, /https:\/\/giscus\.app\/client\.js/);
    assert.match(html, /data-repo="omgyukiel\/personal-site"/);
    assert.match(html, /data-repo-id="R_kgDOSa01KQ"/);
    assert.match(html, /data-category-id="[^\"]+"/);
  } else {
    assert.match(html, /Enable GitHub Discussions/);
  }
});

test("hello world opens with an AI summary and does not expose its editing prompt", async () => {
  const html = await readFile(join(outputRoot, "blog/hello-world/index.html"), "utf8");
  const summaryPosition = html.indexOf('class="article-summary"');
  const openingPosition = html.indexOf("I've always wanted my own portfolio");

  assert.ok(summaryPosition >= 0);
  assert.ok(summaryPosition < openingPosition);
  assert.match(html, />AI summary</);
  assert.doesNotMatch(html, /computer please format my text/i);
});
