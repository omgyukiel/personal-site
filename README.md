# My personal-site

Personal site built with plain HTML/CSS and a vendored copy of `cs16.css`.
`npm run build` runs the static site generator.

Credits to Samuel Breznjak for the 1.6 library, I've always wanted a game-inspired website.
Feel free to fork my repo, please delete my photo though. 

## Editing Content

- Home, profile, nav links, status text, tags, and blog metadata live in `src/site-data.mjs`
- Blog post bodies live in `src/posts/*.html`

To add a blog post:

1. Add a post body at `src/posts/my-post.html`
2. Add a matching entry to the `posts` array in `src/site-data.mjs` with `slug: "my-post"` and `body: "src/posts/my-post.html"`
3. Run `npm run build`

The post URL will be `/blog/my-post/`

## Local Preview

```sh
npm run build
npm run start
```

Then visit `http://127.0.0.1:8000`.

## Comments

Comments managed by Giscus integration 
Each blog posts renders a comment panel in `src/site-data.mjs` 

Comments are linked via Giscus generated repo/category ids. You can see per-blog-post threads in the discussions page in blog comments.

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
