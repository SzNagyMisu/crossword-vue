<script>
import ImportJSON from './components/ImportJSON.vue';
import ExportJSON from './components/ExportJSON.vue';
import StepIndicator from './components/StepIndicator.vue';

import SetSize from './components/steps/SetSize.vue';
import BlackCells from './components/steps/BlackCells.vue';
import SolutionCells from './components/steps/SolutionCells.vue';
import AddNumbers from './components/steps/AddNumbers.vue'
import AddLetters from './components/steps/AddLetters.vue';
import AddDefinitions from './components/steps/AddDefinitions.vue';

const STEPS = [
    {
        id: "define-size",
        title: "Define size",
        description: "Set the number of rows and columns",
        isValid({ table }) {
            return table.length && table[0].length;
        },
    },
    {
        id: "define-black-cells",
        title: "Define black cells",
        description: "Click the cells to make them black - click again to revert",
        isValid() {
            return true;
        },
    },
    {
        id: "define-solution-cells",
        title: "Define solution cells",
        description: "Click the cells to make them highlighted as the solution line",
        isValid() {
            return true;
        },
    },
    {
        id: "add-cell-numbers",
        title: "Add cell numbers",
        description: "Click the cells to add number to them",
        isValid() {
            return true;
        },
    },
    {
        id: "add-letters",
        title: "Add letters",
        description: "Add letters to the cells that are not black",
        isValid({ table }) {
            return table.every(row => row.every(cell => cell.isBlack || cell.value != null));
        },
    },
    {
        id: "add-definitions",
        title: "Add definitions",
        description: "Add definitions to the numbers",
        isValid({ table, definitions }) {
            return table.every(row => row.every(cell => !cell.nr || definitions.horizontal[cell.nr] || definitions.vertical[cell.nr]));
        },
    },
];

export default {
    components: {
        ImportJSON,
        ExportJSON,
        StepIndicator,

        SetSize,
        BlackCells,
        SolutionCells,
        AddNumbers,
        AddLetters,
        AddDefinitions
    },
    data() {
        return {
            _mounted: false,
            steps: STEPS,
            stepIdx: 0,
            table: [],
            definitions: {
                horizontal: {},
                vertical: {},
            },
        }
    },
    methods: {
        setTable(table) {
            this.table = table;
        },
        incrementStepIdx() {
            this.stepIdx++;
        },
        showPrintPreview() {
            //TODO
        },
        importJSON(json) {
            const data = JSON.parse(json);
            this.stepIdx = data.stepIdx;
            this.table = data.table;
            this.definitions = data.definitions;
        },
    },
    mounted() {
        this._mounted = true;
    },
    watch: {
        stepIdx(_newValue, oldValue) {
            if (this.steps[oldValue].id === "add-cell-numbers") {
                this.table.forEach((row, rowIdx) => {
                    row.forEach((cell, colIdx) => {
                        const isHorizontalStart = colIdx === 0 || this.table[rowIdx][colIdx - 1].isBlack;
                        const isVerticalStart = rowIdx === 0 || this.table[rowIdx - 1][colIdx].isBlack;
                        if (cell.nr) {
                            if (isHorizontalStart) this.definitions.horizontal[cell.nr] = "";
                            if (isVerticalStart) this.definitions.vertical[cell.nr] = "";
                        }
                    });
                });
            }
        },
    },
};
</script>

<template>
    <h1>Crossword</h1>

    <ImportJSON @importJSON="importJSON" />
    <ExportJSON v-bind="{ stepIdx, table, definitions }" />

    <StepIndicator
      v-bind="{ steps, stepIdx, table, definitions }"
      @nextStep="incrementStepIdx"
      @finish="showPrintPreview"
    />

    <SetSize             v-if="stepIdx === 0" :table="table" @setTable="setTable" />
    <BlackCells     v-else-if="stepIdx === 1" :table="table" />
    <SolutionCells  v-else-if="stepIdx === 2" :table="table" />
    <AddNumbers     v-else-if="stepIdx === 3" :table="table" />
    <AddLetters     v-else-if="stepIdx === 4" :table="table" />
    <AddDefinitions v-else-if="stepIdx === 5" :table="table" :definitions="definitions" />
</template>
