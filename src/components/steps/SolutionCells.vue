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
        return {
            isValid: true,
        };
    },
    methods: {
        onCellClicked(cell) {
            if (cell.isBlack) return;
            cell.isSolution = !cell.isSolution;
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