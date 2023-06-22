<script>
import CrosswordTable from '../CrosswordTable.vue';
import Definitions from '../Definitions.vue';

export default {
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
        setDefinition(dimension, nr, value) {
            this.definitions[dimension][nr] = value;
        },
        removeDefinition(dimension, nr) {
            delete this.definitions[dimension][nr];
        },
    },
}
</script>

<template>
    <CrosswordTable
        :rows="table"
        :cellsEditable="false"
    />
    <Definitions
        :definitions="definitions"
        @setDefinition="setDefinition"
        @removeDefinition="removeDefinition"
    />
</template>