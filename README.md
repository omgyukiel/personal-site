# My personal-site

Personal site built with plain HTML/CSS and a vendored copy of `cs16.css`.

## Editing Content

- Home, profile, nav links, status text, tags, and blog metadata live in `src/site-data.mjs`
- Blog post bodies live in `src/posts/*.html`

To add a blog post:

1. Add a post body at `src/posts/my-post.html`
2. Add a matching entry to the `posts` array in `src/site-data.mjs`
3. Run `npm run build`

Post URLs use the post slug, e.g. `src/posts/my-post.html` -> `/blog/my-post/`

## Local Preview
Run static site generator with npm build

```sh
npm run build
npm run start
```

Then visit `http://127.0.0.1:8000`.

## Tests

```sh
npm install
npm test
```

To update snapshots:

```sh
npm run test:update
npm test
```
