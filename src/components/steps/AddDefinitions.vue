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
            return true; // TODO all numbers have at least one definition
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
    />
</template>