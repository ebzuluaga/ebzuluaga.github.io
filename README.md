# My site

(there will be something written here in the future...)

## Setup 

```sh
# clone the repo into the 'site' folder
git clone 'https://github.com/ebzuluaga/ebzuluaga.github.io' ./site
cd ./site
node -v # ensure node is installed
npm install # install packages
npm start # Build static files and start a development server
```

If you don't have node installed you can find information on how to get it [here](https://nodejs.org/en/download).

## TODO

- infrastructure
  - ~~configure the github actions/workflow~~
  - make a mirror in gitlab.com
  - make a mirror in pages.dev
- design
  - design styles for h1, h2, p, code blocks, external and internal links, etc.
  - populate with some posts from my obsidian notes
  - have a better way of handling styles (apply basic styles globally, then intelligently inline the needed stylesheet for the current page or source it if it's going to be needed for more than one page)
  - minify the output (if possible, don't obfuscate stuff like classnames or js function names)