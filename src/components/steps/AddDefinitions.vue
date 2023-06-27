<script>
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
        return {}
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
        :cellsEditable="false"
    />
    <input type="button" value="Generate definitions" @click="generateDefinitions" />
    <Definitions
        :definitions="definitions"
        @setTitle="setTitle"
        @createDefinition="createDefinition"
        @setDefinition="setDefinition"
        @removeDefinition="removeDefinition"
        @toggleBoldness="toggleBoldness"
    />
</template>