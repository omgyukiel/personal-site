import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, posix } from "node:path";
import { fileURLToPath } from "node:url";
import { comments, home, posts, projects, site } from "../src/site-data.mjs";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const outputRoot = join(projectRoot, "dist");
const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));
const routes = {
  home: "/",
  projects: "/projects/",
  blog: "/blog/",
  post: (slug) => `/blog/${slug}/`,
};
const assets = {
  mark: "/assets/mark.svg",
  cs16: "/assets/cs16.min.css",
  styles: "/styles.css",
  headshot: "/assets/profile-office.jpg",
};
const publicFiles = [
  [".nojekyll", ".nojekyll"],
  ["CNAME", "CNAME"],
  ["styles.css", "styles.css"],
  ["assets/ArialPixel.ttf", "assets/ArialPixel.ttf"],
  ["assets/cs16.min.css", "assets/cs16.min.css"],
  ["assets/mark.svg", "assets/mark.svg"],
  ["assets/profile-office.jpg", "assets/profile-office.jpg"],
];

function sourcePath(path) {
  return join(projectRoot, path);
}

function outputPath(path) {
  return join(outputRoot, path);
}

function indent(value, spaces) {
  const prefix = " ".repeat(spaces);
  return value
    .trim()
    .split("\n")
    .map((line) => `${prefix}${line}`)
    .join("\n");
}

function externalAttrs(href) {
  return href.startsWith("http")
    ? ' target="_blank" rel="noopener noreferrer"'
    : "";
}

function relativeUrl(fromRoute, toRoute) {
  if (
    toRoute.startsWith("http") ||
    toRoute.startsWith("mailto:") ||
    toRoute.startsWith("#")
  ) {
    return toRoute;
  }

  const fromDir = fromRoute.endsWith("/") ? fromRoute : posix.dirname(fromRoute);
  const target = toRoute.endsWith("/") ? `${toRoute}index.html` : toRoute;
  let relative = posix.relative(fromDir, target);

  if (!relative || relative === "index.html") return "./";
  if (relative.endsWith("/index.html")) {
    relative = relative.slice(0, -"index.html".length);
  }
  return relative.startsWith(".") ? relative : `./${relative}`;
}

function pageHref(fromRoute, toRoute) {
  return relativeUrl(fromRoute, toRoute);
}

function head({ description, title, ogDescription, ogTitle }) {
  const og = ogTitle
    ? `
    <meta property="og:title" content="${ogTitle}" />
    <meta property="og:description" content="${ogDescription}" />
    <meta property="og:type" content="website" />`
    : "";

  return `<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${description}" />${og}
    <title>${title}</title>
    <link rel="icon" href="${assets.mark}" type="image/svg+xml" />
    <link rel="stylesheet" href="${assets.cs16}" />
    <link rel="stylesheet" href="${assets.styles}" />
  </head>`;
}

function header({ current, route }) {
  const navItems = [
    { href: routes.home, label: "Home", itemKey: "home" },
    { href: routes.projects, label: "Projects", itemKey: "projects" },
    { href: routes.blog, label: "Blog", itemKey: "blog" },
    { separator: true },
    { href: site.github, label: "GitHub", icon: "github" },
    { href: `mailto:${site.email}`, label: "Email", icon: "email" },
  ];

  const links = navItems
    .map(({ href, icon, itemKey = "", label, separator }) => {
      if (separator) {
        return '<span class="nav-separator" aria-hidden="true"></span>';
      }

      const currentAttr = itemKey === current ? ' aria-current="page"' : "";
      const resolvedHref = itemKey ? pageHref(route, href) : href;
      const content = icon === "github"
        ? `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.64 0 8.13c0 3.59 2.29 6.64 5.47 7.71.4.08.55-.18.55-.39 0-.19-.01-.83-.01-1.51-2.01.38-2.53-.5-2.69-.96-.09-.23-.48-.96-.82-1.15-.28-.15-.68-.53-.01-.54.63-.01 1.08.59 1.23.83.72 1.23 1.87.88 2.33.67.07-.53.28-.88.51-1.08-1.78-.21-3.64-.91-3.64-4.02 0-.89.31-1.62.82-2.19-.08-.21-.36-1.04.08-2.16 0 0 .67-.22 2.2.84A7.42 7.42 0 0 1 8 3.91c.68 0 1.36.09 2 .27 1.53-1.06 2.2-.84 2.2-.84.44 1.12.16 1.95.08 2.16.51.57.82 1.3.82 2.19 0 3.12-1.87 3.81-3.65 4.02.29.25.54.74.54 1.5 0 1.08-.01 1.95-.01 2.22 0 .22.15.47.55.39A8.13 8.13 0 0 0 16 8.13C16 3.64 12.42 0 8 0Z" /></svg><span class="visually-hidden">${label}</span>`
        : icon === "email"
          ? `<svg viewBox="0 0 18 18" aria-hidden="true"><path d="M2.25 4.25h13.5v9.5H2.25zM2.75 4.75 9 9.5l6.25-4.75" /></svg><span class="visually-hidden">${label}</span>`
          : label;
      const iconClass = icon ? ' class="nav-icon"' : "";
      const labelAttr = icon ? ` aria-label="${label}"` : "";
      return `<a${iconClass} href="${resolvedHref}"${labelAttr}${currentAttr}${externalAttrs(resolvedHref)}>${content}</a>`;
    })
    .join("\n          ");

  return `<header class="site-header">
        <a class="brand" href="${pageHref(route, routes.home)}" aria-label="${site.author} home">
          <img src="${assets.mark}" alt="" width="32" height="32" />
          <span>${site.author}</span>
        </a>
        <nav aria-label="Primary navigation">
          ${links}
        </nav>
      </header>`;
}

function footer() {
  return `<footer class="site-credit">
        <a href="https://cs16.samke.me/" target="_blank" rel="noopener noreferrer">cs16.css</a>
      </footer>`;
}

function renderComments(post) {
  if (!comments.enabled || comments.provider !== "giscus") return "";

  const isConfigured = Boolean(comments.repoId && comments.categoryId);
  const mapName = post.map ?? `de_${post.slug.replaceAll("-", "_")}`;
  const commentFrame = isConfigured
    ? `<script
            src="https://giscus.app/client.js"
            data-repo="${comments.repo}"
            data-repo-id="${comments.repoId}"
            data-category="${comments.category}"
            data-category-id="${comments.categoryId}"
            data-mapping="${comments.mapping}"
            data-strict="${comments.strict}"
            data-reactions-enabled="${comments.reactionsEnabled}"
            data-emit-metadata="${comments.emitMetadata}"
            data-input-position="${comments.inputPosition}"
            data-theme="${comments.theme}"
            data-lang="${comments.lang}"
            crossorigin="anonymous"
            async>
          </script>
          <script>
            window.addEventListener("message", (event) => {
              if (event.origin !== "https://giscus.app") return;
              if (!event.data || !event.data.giscus) return;

              const total = event.data.giscus.discussion?.totalCommentCount;
              if (!Number.isInteger(total)) return;

              document.querySelectorAll("[data-comment-player-count='${post.slug}']")
                .forEach((element) => {
                  element.textContent = String(total);
                });
            });
          </script>`
    : `<p class="comments-setup">
            Enable GitHub Discussions, create a "${comments.category}" category, then add its Giscus category ID in site data.
          </p>`;

  return `<section class="comments-panel" aria-labelledby="comments-title-${post.slug}">
        <div class="comments-titlebar">
          <h2 id="comments-title-${post.slug}">match chat</h2>
          <dl class="comments-scoreboard" aria-label="Comment thread details">
            <div><dt>map</dt><dd>${mapName}</dd></div>
            <div><dt>players</dt><dd><span data-comment-player-count="${post.slug}">0</span>/16</dd></div>
          </dl>
        </div>
        <div class="comments-body">
          ${commentFrame}
        </div>
      </section>`;
}

function document({ content, description, mainClass, title, current, route, ogDescription, ogTitle }) {
  return `<!doctype html>
<html lang="en">
  ${head({ description, title, ogDescription, ogTitle })}
  <body>
    <main class="${mainClass}">
      ${header({ current, route })}

${indent(content, 6)}

      ${footer()}
    </main>
  </body>
</html>
`;
}

function renderHome() {
  const route = routes.home;
  const writingRows = sortedPosts
    .slice(0, 3)
    .map(
      (post) => `<article class="post-row">
          <time datetime="${post.date}">${post.displayDate}</time>
          <div>
            <h2><a href="${pageHref(route, routes.post(post.slug))}">${post.title}</a></h2>
            <p>${post.homeExcerpt ?? post.excerpt}</p>
          </div>
        </article>`,
    )
    .join("\n        ");

  const content = `<section class="intro" aria-labelledby="intro-title">
        <div class="intro-copy">
          <p class="eyebrow">${home.eyebrow}</p>
          <h1 id="intro-title">${home.title}</h1>
          <p>${home.introduction}</p>
        </div>
        <figure class="portrait">
          <img src="${assets.headshot}" alt="Kenny Levu composited over the office map from Counter-Strike" width="900" height="900" />
        </figure>
      </section>

      <section class="index-section" aria-labelledby="writing-title">
        <div class="section-heading">
          <p class="section-label">01</p>
          <h2 id="writing-title">Writing</h2>
          <a href="${pageHref(route, routes.blog)}">All posts</a>
        </div>
        ${writingRows}
      </section>`;

  return document({
    content,
    current: "home",
    description: site.description,
    mainClass: "shell",
    route,
    title: site.title,
    ogTitle: site.title,
    ogDescription: site.description,
  });
}

function renderProjectsIndex() {
  const route = routes.projects;
  const projectRows = projects
    .map(
      (project) => `<article class="project-row">
          <div class="row-meta">${project.meta}</div>
          <div>
            <h2><a href="${project.href}" target="_blank" rel="noopener noreferrer">${project.title}</a></h2>
            <p>${project.description}</p>
            <a class="source-link" href="${project.href}" target="_blank" rel="noopener noreferrer">View source <span aria-hidden="true">↗</span></a>
          </div>
        </article>`,
    )
    .join("\n        ");

  const content = `<header class="page-head">
        <p class="eyebrow">projects</p>
      </header>

      <section class="project-list" aria-label="Projects">
        ${projectRows}
      </section>`;

  return document({
    content,
    current: "projects",
    description: `Projects by ${site.author}.`,
    mainClass: "shell shell-narrow",
    route,
    title: `Projects / ${site.author}`,
  });
}

function renderBlogIndex() {
  const route = routes.blog;
  const postRows = sortedPosts
    .map(
      (post) => `<article class="post-row">
          <time datetime="${post.date}">${post.displayDate}</time>
          <div>
            <h2><a href="${pageHref(route, routes.post(post.slug))}">${post.title}</a></h2>
            <p>${post.excerpt}</p>
          </div>
        </article>`,
    )
    .join("\n        ");

  const content = `<header class="page-head">
        <p class="eyebrow">writing</p>
      </header>

      <section class="post-list" aria-label="Posts">
        ${postRows}
      </section>`;

  return document({
    content,
    current: "blog",
    description: site.blogDescription,
    mainClass: "shell shell-narrow",
    route,
    title: `Blog / ${site.author}`,
  });
}

async function renderPost(post) {
  const route = routes.post(post.slug);
  const body = await readFile(sourcePath(post.body), "utf8");
  const content = `<article class="article">
        <a class="back-link" href="${pageHref(route, routes.blog)}">Back to blog</a>
        <header>
          <p class="eyebrow">${post.displayDate}</p>
          <h1>${post.title}</h1>
        </header>
        <div class="article-body">
${indent(body, 10)}
        </div>
      </article>

      ${renderComments(post)}`;

  return document({
    content,
    current: "blog",
    description: post.description,
    mainClass: "shell shell-article",
    route,
    title: `${post.title} / ${site.author}`,
  });
}

async function writePage(path, content) {
  const destination = outputPath(path);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, content);
}

async function copyPublicFile(source, destination) {
  const target = outputPath(destination);
  await mkdir(dirname(target), { recursive: true });
  await copyFile(sourcePath(source), target);
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

for (const [source, destination] of publicFiles) {
  await copyPublicFile(source, destination);
}

await writePage("index.html", renderHome());
await writePage("projects/index.html", renderProjectsIndex());
await writePage("blog/index.html", renderBlogIndex());

for (const post of sortedPosts) {
  await writePage(`blog/${post.slug}/index.html`, await renderPost(post));
}

console.log(`Built ${3 + sortedPosts.length} pages in dist/.`);
