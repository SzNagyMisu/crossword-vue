# Crossword - deploy branch

> This branch is auto deployed to https://sznagymisu.github.io/crossword-vue/

## Steps to deploy

1. make changes on the `main` branch, commit and push them
2. build the package, still on the `main` branch (`npm rum build`)
3. on the `deploy` branch remove old CSS and JS files (`/assets/index-{hash}.{js/css}`, or simply the `/assets/` folder)
4. copy everything from the `/dist/` folder to the `deploy` branch root folder
5. commit and push to `deploy` - it'll automatically push out the changes to the webpage
