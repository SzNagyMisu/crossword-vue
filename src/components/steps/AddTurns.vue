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
            turnDirection: "down",
        };
    },
    methods: {
        toggleTurn(cellClicked) {
            cellClicked.turn = cellClicked.turn === this.turnDirection ? undefined : this.turnDirection;
        },
        autoAddTurns() {
            this.table.forEach((row, rowIdx) => {
                row.forEach((cell, colIdx) => {
                    if (cell.isSolution) {
                        const cellLeft = this.table[rowIdx][colIdx - 1];
                        const cellTop = this.table[rowIdx - 1] && this.table[rowIdx - 1][colIdx];
                        const cellRight = this.table[rowIdx][colIdx + 1];
                        const cellBottom = this.table[rowIdx + 1] && this.table[rowIdx + 1][colIdx];

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
    },
}
</script>

<template>
    <label><input type="radio" value="down" v-model="turnDirection" /> turn down</label>
    <label><input type="radio" value="right" v-model="turnDirection" /> turn right</label>

    <input type="button" value="Auto add turns" @click="autoAddTurns">

    <CrosswordTable
        :rows="table"
        :cellsEditable="false"
        @cellClicked="toggleTurn"
    />
</template>

<style scoped>
input[type=button] {
    display: block;
    margin: 12px 0;
}
</style>
