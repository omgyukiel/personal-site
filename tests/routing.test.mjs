import { access, readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { test } from "node:test";
import assert from "node:assert/strict";

const projectRoot = resolve(import.meta.dirname, "..");

const pageExpectations = [
  {
    file: "index.html",
    hrefs: ["./", "./profile/", "./blog/", "./blog/hello-world/"],
  },
  {
    file: "blog/index.html",
    hrefs: ["../", "../profile/", "./", "./hello-world/"],
  },
  {
    file: "blog/hello-world/index.html",
    hrefs: ["../../", "../../profile/", "../"],
  },
  {
    file: "profile/index.html",
    hrefs: ["../", "./", "../blog/"],
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

  const base = dirname(join(projectRoot, fromFile));
  const target = resolve(base, href);
  return href.endsWith("/") ? join(target, "index.html") : target;
}

test("generated pages use expected internal route hrefs", async () => {
  for (const { file, hrefs: expectedHrefs } of pageExpectations) {
    const html = await readFile(join(projectRoot, file), "utf8");
    const hrefs = extractHrefs(html);

    for (const expectedHref of expectedHrefs) {
      assert.ok(
        hrefs.includes(expectedHref),
        `${file} should include href="${expectedHref}"`,
      );
    }
  }
});

test("generated internal links do not leak filesystem paths", async () => {
  for (const { file } of pageExpectations) {
    const html = await readFile(join(projectRoot, file), "utf8");
    const hrefs = extractHrefs(html);

    for (const href of hrefs) {
      assert.equal(
        /(?:^|[./])Users\/|\/personal-site\//.test(href),
        false,
        `${file} has filesystem-looking href="${href}"`,
      );
    }
  }
});

test("generated internal route hrefs resolve to files in the site", async () => {
  for (const { file } of pageExpectations) {
    const html = await readFile(join(projectRoot, file), "utf8");
    const hrefs = extractHrefs(html);

    for (const href of hrefs) {
      const target = localPageTarget(file, href);
      if (!target) continue;

      await access(target);
    }
  }
});
