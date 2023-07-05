<script setup>
import { supportedLanguages, currentLang } from '../i18n';
</script>

<template>
    <ul class="language-selector">
        <li
            v-for="lang in supportedLanguages"
            :key="lang"
            class="language-tile"
        >
            <span v-if="currentLang === lang">{{ lang }}</span>
            <a v-else :href="`?lang=${lang}`">{{ lang }}</a>
        </li>
    </ul>
</template>

<style scoped>
ul.language-selector {
    padding-inline-start: 0;
    display: flex;
    gap: 5px;
    list-style: none;
    position: absolute;
    top: 10px;
    right: 10px;
}

li.language-tile {
    padding: 4px 12px;
    border: 1px solid black;
    border-radius: 4px;
    text-transform: uppercase;
}
</style>
