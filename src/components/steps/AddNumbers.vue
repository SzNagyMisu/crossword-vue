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
        return {}
    },
    computed: {
        isValid() {
            return true; // TODO all numbers have row or col value 0 or preceeded by a black
        },
    },
    methods: {
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