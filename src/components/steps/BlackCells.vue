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
    methods: {
        onCellClicked(cell) {
            cell.isBlack = !cell.isBlack;
        },
    },
}
</script>

<template>
    <CrosswordTable
        :rows="table"
        :cellsEditable="false"
        @cellClicked="onCellClicked"
    />
</template>