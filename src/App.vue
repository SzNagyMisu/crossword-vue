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
      stepIdx: 0,
      table: [],
      definitions: {
        horizontal: {},
        vertical: {},
      },
    }
  },
  computed: {
    isCurrentStepValid() {
      // TODO doesn't get reevaluated on import
      return this._mounted && this.$refs.currentStep.isValid;
    },
  },
  methods: {
    setTable (table) {
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
      this.stepIdx = +data.stepIdx;
      this.table = data.table;
      this.definitions = data.definitions;
    }
  },
  mounted() {
    this._mounted = true;
  },
  watch: {
    stepIdx(_newValue, oldValue) {
      if (oldValue === 3) {
        this.table.forEach(row => {
          row.forEach(cell => {
            if (cell.nr) {
              this.definitions.horizontal[cell.nr] = "";
              this.definitions.vertical[cell.nr] = "";
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
    :stepIdx="stepIdx"
    :isCurrentStepValid="isCurrentStepValid"
    @nextStep="incrementStepIdx"
    @finish="showPrintPreview"
  />

  <SetSize             v-if="stepIdx === 0" ref="currentStep" :table="table" @setTable="setTable" />
  <BlackCells     v-else-if="stepIdx === 1" ref="currentStep" :table="table" />
  <SolutionCells  v-else-if="stepIdx === 2" ref="currentStep" :table="table" />
  <AddNumbers     v-else-if="stepIdx === 3" ref="currentStep" :table="table" />
  <AddLetters     v-else-if="stepIdx === 4" ref="currentStep" :table="table" />
  <AddDefinitions v-else-if="stepIdx === 5" ref="currentStep" :table="table" :definitions="definitions" />
</template>
