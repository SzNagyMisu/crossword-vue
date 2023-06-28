<script>
import { findHorizontalWord, findVerticalWord } from '../../utils.js';
import CrosswordTable from '../CrosswordTable.vue';
import Definitions from '../Definitions.vue';

export default {
    emits: ["generateDefinitions"],
    components: {CrosswordTable, Definitions},
    props: {
        table: {
            type: Array,
            required: true,
        },
        definitions: {
            type: Object,
            required: true,
        },
    },
    data () {
        return {};
    },
    computed: {
        definitionWords() {
            const horizontal = {};
            Object.keys(this.definitions.horizontal.lines)
                .forEach(nr => horizontal[nr] = findHorizontalWord(nr, this.table));
            const vertical = {};
            Object.keys(this.definitions.vertical.lines)
                .forEach(nr => vertical[nr] = findVerticalWord(nr, this.table));

            return { horizontal, vertical };
        },
    },
    methods: {
        generateDefinitions() {
            this.$emit("generateDefinitions");
        },
        setTitle(dimension, value) {
            this.definitions[dimension].title = value;
        },
        createDefinition(dimension, nr) {
            this.definitions[dimension].lines[nr] = {
                value: "",
                isBold: false,
            };
        },
        setDefinition(dimension, nr, value) {
            this.definitions[dimension].lines[nr].value = value;
        },
        toggleBoldness(dimension, nr) {
            this.definitions[dimension].lines[nr].isBold = !this.definitions[dimension].lines[nr].isBold
        },
        removeDefinition(dimension, nr) {
            delete this.definitions[dimension].lines[nr];
        },
    },
}
</script>

<template>
    <CrosswordTable
        :rows="table"
        :cellsEditable="true"
    />
    <input type="button" value="Generate empty definitions" @click="generateDefinitions" />
    <Definitions
        :definitions="definitions"
        :definitionWords="definitionWords"
        @setTitle="setTitle"
        @createDefinition="createDefinition"
        @setDefinition="setDefinition"
        @removeDefinition="removeDefinition"
        @toggleBoldness="toggleBoldness"
    />
</template>

<style scoped>
input[type=button] {
    margin: 24px 0 12px 0;
}
</style>
