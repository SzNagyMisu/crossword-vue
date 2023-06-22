<script>
import CrosswordTable from '../CrosswordTable.vue';

export default {
    components: {CrosswordTable},
    props: {
        table: {
            type: Array,
            required: true,
        },
    },
    data () {
        return {};
    },
}
</script>

<template>
    <CrosswordTable
        :rows="table"
        :cellsEditable="true"
    />
</template>