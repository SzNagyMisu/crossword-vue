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
        onCellClicked(cell, rowIdx, colIdx) {
            this.table[rowIdx][colIdx] = cell.isBlack ? {} : { isBlack: true };
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