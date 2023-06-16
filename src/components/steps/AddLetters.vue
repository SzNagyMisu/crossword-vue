<script>
import CrosswordTable from '../CrosswordTable.vue';

export default {
    components: {CrosswordTable},
    expose: ["isValid"],
    props: {
        table: {
            type: Array,
            required: true,
        },
    },
    data () {
        return {}
    },
    computed: {
        isValid() {
            return true; // TODO all non black cells have a letter
        },
    },
}
</script>

<template>
    <CrosswordTable
        :rows="table"
        :cellsEditable="true"
    />
</template>