# Crossword - deploy branch

> This branch is auto deployed to https://sznagymisu.github.io/crossword-vue/

## Steps to deploy

1. make changes on the `main` branch, commit and push them
2. build the package, still on the `main` branch (`npm rum build`)
3. copy everything in the `/dist/` folder to the `deploy` branch root folder
4. remove old CSS and JS files (`/assets/index-{hash}.{js/css}`)
5. checkout changes in the `index.html` file that would add a leading `/` for the assets and the favicon (this is importtant because the page is under the path `/crossword-vue/` and setting `/anything` as path would check outside)
```html
<link rel="icon" href="favicon.ico">
                       ^ (not "/favicon.ico")
<script type="module" crossorigin src="assets/index-e14ee8af.js"></script>
                                       ^ (not "/assets/...")
<link rel="stylesheet" href="assets/index-6a37ff9c.css">
                             ^ (not "/assest/...")
```
6. commit and push to `deploy` - it'll automatically push out the changes to the webpage
