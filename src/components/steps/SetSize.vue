<script>
import CrosswordSizeForm from '../CrosswordSizeForm.vue';
import CrosswordTable from '../CrosswordTable.vue';

export default {
    components: {CrosswordSizeForm, CrosswordTable},
    emits: ["setTable"],
    props: {
        table: {
            type: Array,
            required: true,
        },
    },
    data () {
        return {};
    },
    computed: {
        rowsCount() {
            return this.table.length;
        },
        columnsCount() {
            return this.table[0] ? this.table[0].length : 0;
        },
    },
    methods: {
        setRows(rows) {
            const columns = this.columnsCount;
            this.setTable(rows, columns);
        },
        setColumns(columns) {
            const rows = this.rowsCount;
            this.setTable(rows, columns);
        },
        setTable(rows, columns) {
            const table = [];
            for (let rowIdx = 0; rowIdx < rows; rowIdx++) {
                const row = [];
                for (let colIdx = 0; colIdx < columns; colIdx++) {
                    const originalValue = this.table[rowIdx] && this.table[rowIdx][colIdx];
                    row.push(originalValue || {});
                }
                table.push(row);
            }
            this.$emit("setTable", table);
        },
    },
}
</script>

<template>
  <CrosswordSizeForm
    :rows="rowsCount"
    :columns="columnsCount"
    :isActive="true"
    @rowsChange="setRows"
    @columnsChange="setColumns"
  />
  <CrosswordTable
    :rows="table"
    :cellsEditable="false"
  />
</template>