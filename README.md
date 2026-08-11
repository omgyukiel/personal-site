# Kenny Levu's personal site

A small static site for projects and writing, built with plain HTML/CSS and a
vendored copy of `cs16.css`.

## Editing content

- Homepage copy, project entries, navigation links, and blog metadata live in
  `src/site-data.mjs`.
- Blog post bodies live in `src/posts/*.html`.
- `npm run build` generates the public site in `dist/`.

To add a blog post:

1. Add the post body at `src/posts/my-post.html`.
2. Add a matching entry to `posts` in `src/site-data.mjs`.
3. Run `npm run build`.

The post URL will be `/blog/my-post/`.

## Local preview

```sh
npm ci --registry=https://registry.npmjs.org
npm run build
npm run start
```

Then visit `http://127.0.0.1:8000`.

## Deployment

`.github/workflows/pages.yml` builds and deploys only `dist/` through GitHub
Pages Actions. The repository's Pages source must be set to **GitHub Actions**.
The `archive/` directory is retained in source control but is intentionally not
part of the deployment artifact.

## Tests

```sh
npm test
```

To update visual snapshots:

```sh
npm run test:update
npm test
```
