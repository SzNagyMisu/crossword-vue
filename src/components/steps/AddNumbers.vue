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
        return {
            addType: "number",
        };
    },
    methods: {
        autoAddNumbersAndTurns() {
            let currentNr = 1;
            this.table.forEach((row, rowIdx) => {
                row.forEach((cell, colIdx) => {
                    if (cell.isBlack) return;

                    const cellLeft = this.table[rowIdx][colIdx - 1];
                    const cellTop = this.table[rowIdx - 1] && this.table[rowIdx - 1][colIdx];
                    const cellRight = this.table[rowIdx][colIdx + 1];
                    const cellBottom = this.table[rowIdx + 1] && this.table[rowIdx + 1][colIdx];

                    const isHorizontalStart = colIdx === 0 || cellLeft.isBlack;
                    const isVerticalStart = rowIdx === 0 || cellTop.isBlack;
                    if (isHorizontalStart || isVerticalStart) {
                        cell.nr = currentNr;
                        currentNr++;
                    }

                    if (cell.isSolution) {
                        if (
                            cellLeft && cellLeft.isSolution &&
                            cellBottom && cellBottom.isSolution
                        ) {
                            cell.turn = "down";
                        } else if (
                            cellTop && cellTop.isSolution &&
                            cellRight && cellRight.isSolution
                        ) {
                            cell.turn = "right";
                        }
                    }
                });
            });
        },
        onCellClicked(cellClicked) {
            switch (this.addType) {
                case "number":
                    this.toggleNumber(cellClicked);
                    break;
                case "turn-down":
                    this.toggleTurn(cellClicked, "down");
                    break;
                case "turn-right":
                    this.toggleTurn(cellClicked, "right");
                    break;
            }
        },
        toggleNumber(cellClicked) {
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
    What to add:
    <label><input type="radio" value="number" v-model="addType" /> number</label>
    <label><input type="radio" value="turn-down" v-model="addType" /> turn down</label>
    <label><input type="radio" value="turn-right" v-model="addType" /> turn right</label>

    <input type="button" value="Auto add numbers and turns" @click="autoAddNumbersAndTurns">
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
