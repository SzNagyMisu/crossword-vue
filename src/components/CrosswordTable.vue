<script>
import Cell from './Cell.vue';

export default {
    components: { Cell },
    props: {
        rows: {
            type: Array,
            required: true,
        },
        cellsEditable: {
            required: true,
            type: Boolean,
        },
    },
    emits: ["cellClicked"],
    methods: {
        onCellClicked(cell) {
            this.$emit("cellClicked", cell);
        },
        setCellValue(cell, value) {
            cell.value = value;
        },
        navigate(fromCellRow, fromCellCol, direction) {
            const rowCount = this.rows.length;
            const colCount = this.rows[0].length;
            let toCellRow, toCellCol;

            if (["ArrowLeft", "ArrowRight"].includes(direction)) {
                toCellRow = fromCellRow;
                toCellCol = (fromCellCol + (direction === "ArrowLeft" ? -1 : 1) + colCount) % colCount;
            } else {
                toCellRow = (fromCellRow + (direction === "ArrowUp" ? -1 : 1) + rowCount) % rowCount;
                toCellCol = fromCellCol;
            }

            if (this.rows[toCellRow][toCellCol].isBlack) {
                this.navigate(toCellRow, toCellCol, direction);
            } else {
                this.$refs.cells.find(cell => cell.col === toCellCol && cell.row === toCellRow).focus();
            }
        },
    }
};
</script>

<template>
    <section class="table">
        <section class="row" v-for="(row, rowIdx) in rows" :key="rowIdx">
            <Cell
                v-for="(cell, colIdx) in row"
                ref="cells"
                :key="colIdx"
                :isEditable="cellsEditable"
                :row="rowIdx"
                :col="colIdx"
                v-bind="cell"
                @click="() => onCellClicked(cell)"
                @input="value => setCellValue(cell, value)"
                @navigate="direction => navigate(rowIdx, colIdx, direction)"
            />
        </section>
    </section>
</template>

<style scoped>
section.row {
    display: flex
}
</style>