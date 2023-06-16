<script>
export default {
    props: {
        stepIdx: Number,
        table: Array,
        definitions: Object,
    },
    data() {
        return {
            showJSON: false,
        };
    },
    computed: {
        jsonObject() {
            return {
                stepIdx: this.stepIdx,
                table: this.table,
                definitions: this.definitions,
            };
        },
        jsonString() {
            return JSON.stringify(this.jsonObject);
        },
        copyJSON() {
            navigator.clipboard.writeText(this.jsonString); // TODO not working
        },
    },
}
</script>

<template>
    <input v-if="!showJSON" type="button" value="Export JSON" @click="showJSON = true">
    <section v-else>
        <pre>{{ jsonObject }}</pre>
        <input type="button" value="Copy" @click="copyJSON">
        <input type="button" value="Done" @click="showJSON = false">
    </section>
</template>

<style scoped>
pre {
    border: 1px solid black;
    max-height: 250px;
    overflow-y: auto;
}
</style>