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
        autoAddNumbers() {
            let currentNr = 1;
            this.table.forEach((row, rowIdx) => {
                row.forEach((cell, colIdx) => {
                    if (cell.isBlack) return;

                    const isHorizontalStart = colIdx === 0 || this.table[rowIdx][colIdx - 1].isBlack;
                    const isVerticalStart = rowIdx === 0 || this.table[rowIdx - 1][colIdx].isBlack;
                    if (isHorizontalStart || isVerticalStart) {
                        cell.nr = currentNr;
                        currentNr++;
                    }
                });
            });
        },
        onCellClicked(cellClicked) {
            let currentNr = 1;
            this.table.forEach(row => {
                row.forEach(cell => {
                    if (cell.isBlack) return;

                    if (cell === cellClicked) {
                        if (cell.nr != null) {
                            delete cell.nr;
                        } else {
                            cell.nr = currentNr;
                            currentNr++;
                        }
                    } else if (cell.nr != null) {
                        cell.nr = currentNr;
                        currentNr++;
                    }
                });
            });
        },
        toggleTurn(cellClicked, direction) {
            cellClicked.turn = cellClicked.turn === direction ? undefined : direction;
        },
    },
}
</script>

<template>
    <input type="button" value="Auto add numbers" @click="autoAddNumbers">
    <CrosswordTable
        :rows="table"
        :cellsEditable="false"
        @cellClicked="onCellClicked"
    />
</template>

<style scoped>
input[type=button] {
    display: block;
    margin: 12px 0;
}
</style>
