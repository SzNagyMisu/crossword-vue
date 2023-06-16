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