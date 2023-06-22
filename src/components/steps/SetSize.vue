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
            for (let row = 0; row < rows; row++) {
                const row = [];
                for (let col = 0; col < columns; col++) {
                    row.push({});
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