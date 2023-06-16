<script>
import StepIndicator from './components/StepIndicator.vue';

import SetSize from './components/steps/SetSize.vue';
import BlackCells from './components/steps/BlackCells.vue';
import SolutionCells from './components/steps/SolutionCells.vue';
import AddNumbers from './components/steps/AddNumbers.vue'
import AddLetters from './components/steps/AddLetters.vue';
import AddDefinitions from './components/steps/AddDefinitions.vue';

const STEPS = {
  0: {
    title: "Define size",
    description: "Set the number of rows and columns",
  },
  1: {
    title: "Define black cells",
    description: "Click the cells to make them black - click again to revert",
  },
  2: {
    title: "Define solution cells",
    description: "Click the cells to make them highlighted as the solution line",
  },
  3: {
    title: "Add cell numbers",
    description: "Click the cells to add number to them",
  },
  4: {
    title: "Add letters",
    description: "Add letters to the cells that are not black",
  },
  5: {
    title: "Add definitions",
    description: "Add definitions to the numbers",
  },
};

export default {
  components: {
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
      steps: Object.values(STEPS),
      stepIdx: 0,
      table: [],
      definitions: { //TODO
        horizontal: {},
        vertical: {},
      },
    }
  },
  computed: {
    currentStep () {
      return this.steps[this.stepIdx];
    },
    isCurrentStepValid() {
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

  <StepIndicator
    :steps="steps"
    :currentStep="stepIdx"
    :isCurrentStepValid="isCurrentStepValid"
    @nextStep="incrementStepIdx"
  />

  <h2>{{ currentStep.title }}</h2>
  <blockquote>{{ currentStep.description }}</blockquote>

  <SetSize             v-if="stepIdx === 0" ref="currentStep" :table="table" @setTable="setTable" />
  <BlackCells     v-else-if="stepIdx === 1" ref="currentStep" :table="table" />
  <SolutionCells  v-else-if="stepIdx === 2" ref="currentStep" :table="table" />
  <AddNumbers     v-else-if="stepIdx === 3" ref="currentStep" :table="table" />
  <AddLetters     v-else-if="stepIdx === 4" ref="currentStep" :table="table" />
  <AddDefinitions v-else-if="stepIdx === 5" ref="currentStep" :table="table" :definitions="definitions" />
</template>
