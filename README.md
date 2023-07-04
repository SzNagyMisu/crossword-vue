# Crossword

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## I18n

### Usage

Inside components `i18n` is already attached to `this`, use it without importing:

```vue
<script>
export default {
    data() {
        return {
            title: this.i18n.t`Page title`,
        };
    },
}
</script>
<template>
    <h1>{{ title }}</h1>
    <p>{{ i18n.t`Some paragraph text.` }}</p>
</template>
```

Outside components, import it from `src/i18n`.

### Translations JSON

The `translations.json` file used by `i18n` lives in the folder `src/i18n/`. In case you added a new string to translate, run

```sh
node scripts/generate_translation_keys.js
```

to add it to the file with `""` as value. Change this to the translated value eventually.
