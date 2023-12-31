<script>
import { i18n } from './i18n';

import ImportJSON from './components/ImportJSON.vue';
import ExportJSON from './components/ExportJSON.vue';
import StepIndicator from './components/StepIndicator.vue';
import LanguageSelector from './components/LanguageSelector.vue';

import SetSize from './components/steps/SetSize.vue';
import BlackCells from './components/steps/BlackCells.vue';
import SolutionCells from './components/steps/SolutionCells.vue';
import AddNumbers from './components/steps/AddNumbers.vue'
import AddTurns from './components/steps/AddTurns.vue';
import AddLetters from './components/steps/AddLetters.vue';
import AddDefinitions from './components/steps/AddDefinitions.vue';
import PrintPreview from './components/steps/PrintPreview.vue';

const STEPS = [
    {
        id: "define-size",
        title: i18n.t`Define size`,
        description: i18n.t`Set the number of rows and columns`,
        isValid({ table }) {
            return table.length && table[0].length;
        },
    },
    {
        id: "define-black-cells",
        title: i18n.t`Define black cells`,
        description: i18n.t`Click the cells to make them black - click again to revert`,
        isValid() {
            return true;
        },
    },
    {
        id: "define-solution-cells",
        title: i18n.t`Define solution cells`,
        description: i18n.t`Click the cells to make them highlighted as the solution line`,
        isValid() {
            return true;
        },
    },
    {
        id: "add-numbers",
        title: i18n.t`Add numbers`,
        description: i18n.t`Click the cells to add or remove number`,
        isValid() {
            return true;
        },
    },
    {
        id: "add-turns",
        title: i18n.t`Add turns`,
        description: i18n.t`Click the cells to add or remove turns`,
        isValid() {
            return true;
        },
    },
    {
        id: "add-letters",
        title: i18n.t`Add letters`,
        description: i18n.t`Add letters to the cells that are not black`,
        isValid({ table }) {
            return table.every(row => row.every(cell => cell.isBlack || cell.value != null));
        },
    },
    {
        id: "add-definitions",
        title: i18n.t`Add definitions`,
        description: i18n.t`Add definitions to the numbers`,
        isValid({ table, definitions }) {
            return table.every(row => (
                row.every(cell => (
                    !cell.nr
                        || definitions.horizontal.lines[cell.nr] && definitions.horizontal.lines[cell.nr].value
                        || definitions.vertical.lines[cell.nr] && definitions.vertical.lines[cell.nr].value
                ))
            ));
        },
    },
    {
        id: "print-preview",
        title: i18n.t`Print preview`,
        description: i18n.t`Check how it looks like on paper and print eventually`,
        isValid() {
            return true;
        },
    },
];

export default {
    components: {
        ImportJSON,
        ExportJSON,
        StepIndicator,
        LanguageSelector,

        SetSize,
        BlackCells,
        SolutionCells,
        AddNumbers,
        AddTurns,
        AddLetters,
        AddDefinitions,
        PrintPreview,
    },
    data() {
        return {
            _mounted: false,
            steps: STEPS,
            stepIdx: 0,
            maxStepReached: 0,
            table: [],
            definitions: {
                horizontal: {
                    title: "Horizontal",
                    lines: {},
                },
                vertical: {
                    title:  "Vertical",
                    lines: {},
                },
            },
        };
    },
    computed: {
        currentStepId() {
            return this.steps[this.stepIdx].id;
        },
    },
    methods: {
        setTable(table) {
            this.table = table;
        },
        setStepIdx(stepIdx) {
            this.stepIdx = stepIdx;
            if (stepIdx > this.maxStepReached) this.maxStepReached = stepIdx;
        },
        importJSON(json) {
            const data = JSON.parse(json);
            this.stepIdx = data.stepIdx;
            this.maxStepReached = "maxStepReached" in data ? data.maxStepReached : data.stepIdx;
            this.table = data.table;
            this.definitions = data.definitions;
        },
        generateDefinitions() {
            this.table.forEach((row, rowIdx) => {
                row.forEach((cell, colIdx) => {
                    const isHorizontalStart = colIdx === 0 || this.table[rowIdx][colIdx - 1].isBlack;
                    const isVerticalStart = rowIdx === 0 || this.table[rowIdx - 1][colIdx].isBlack;
                    if (cell.nr) {
                        if (isHorizontalStart) {
                            this.definitions.horizontal.lines[cell.nr] = {
                                value: "",
                                isBold: false,
                            };
                        }
                        if (isVerticalStart) {
                            this.definitions.vertical.lines[cell.nr] = {
                                value: "",
                                isBold: false,
                            };
                        }
                    }
                });
            });
        },
    },
    mounted() {
        this._mounted = true;
    },
};
</script>

<template>
    <h1>Crossword</h1>

    <LanguageSelector />
    <ImportJSON @importJSON="importJSON" />
    <ExportJSON v-bind="{ stepIdx, table, definitions }" />

    <StepIndicator
      v-bind="{ steps, stepIdx, maxStepReached, table, definitions }"
      @setStepIdx="setStepIdx"
    />

    <SetSize             v-if="currentStepId === 'define-size'" :table="table" @setTable="setTable" />
    <BlackCells     v-else-if="currentStepId === 'define-black-cells'" :table="table" />
    <SolutionCells  v-else-if="currentStepId === 'define-solution-cells'" :table="table" />
    <AddNumbers     v-else-if="currentStepId === 'add-numbers'" :table="table" />
    <AddTurns       v-else-if="currentStepId === 'add-turns'" :table="table" />
    <AddLetters     v-else-if="currentStepId === 'add-letters'" :table="table" />
    <AddDefinitions v-else-if="currentStepId === 'add-definitions'" :table="table" :definitions="definitions" @generateDefinitions="generateDefinitions" />
    <PrintPreview   v-else-if="currentStepId === 'print-preview'" :table="table" :definitions="definitions" />
</template>

<style scoped>
@media print {
    h1 {
        display: none;
    }
}
</style>
