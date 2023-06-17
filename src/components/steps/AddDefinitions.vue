<script>
import CrosswordTable from '../CrosswordTable.vue';
import Definitions from '../Definitions.vue';

export default {
    components: {CrosswordTable, Definitions},
    expose: ["isValid"],
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
    computed: {
        isValid() {
            // return true;
            return this.table.every(row => (
                row.every(cell => (
                    !cell.nr
                        || this.definitions.horizontal[cell.nr]
                        || this.definitions.vertical[cell.nr]
                ))
            ));
        },
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