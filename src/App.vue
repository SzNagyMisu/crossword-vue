<script>
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
    dependsOn: [],
  },
  1: {
    title: "Define black cells",
    description: "Click the cells to make them black - click again to revert",
    dependsOn: [0],
  },
  2: {
    title: "Define solution cells",
    description: "Click the cells to make them highlighted as the solution line",
    dependsOn: [0],
  },
  3: {
    title: "Add cell numbers",
    description: "Click the cells to add number to them",
    dependsOn: [0, 1],
  },
  4: {
    title: "Add letters",
    description: "Add letters to the cells that are not black",
    dependsOn: [0, 1],
  },
  5: {
    title: "Add definitions",
    description: "Add definitions to the numbers",
    dependsOn: [0, 1, 2, 3],
  }
};

export default {
  components: {
    SetSize,
    BlackCells,
    SolutionCells,
    AddNumbers,
    AddLetters,
    AddDefinitions
  },
  data() {
    return {
      steps: Object.values(STEPS),
      stepIdx: 0,
      table: [],
      definitions: { //TODO
        horizontal: {1: "", 2: ""},
        vertical: {2: "", 3: ""},
      },
    }
  },
  computed: {
    currentStep () {
      return this.steps[this.stepIdx];
    },
  },
  methods: {
    isStepDisabled (step) {
      return false;
    },
    setTable (table) {
      this.table = table;
    },
  },
};
</script>

<template>
  <h1>Crossword</h1>
  <ul>
    <li v-for="(step, idx) in steps" :key="idx">
      <label>
        <input type="radio" :value="idx" name="stepNr" :disabled="isStepDisabled(step)" v-model="stepIdx">
        {{ step.title }}
      </label>
    </li>
  </ul>
  <h2>{{ currentStep.title }}</h2>
  <blockquote>{{ currentStep.description }}</blockquote>

  <SetSize v-if="stepIdx === 0" :table="table" @setTable="setTable"/>
  <BlackCells v-if="stepIdx === 1" :table="table" />
  <SolutionCells v-if="stepIdx === 2" :table="table" />
  <AddNumbers v-if="stepIdx === 3" :table="table" />
  <AddLetters v-if="stepIdx === 4" :table="table" />
  <AddDefinitions v-if="stepIdx === 5" :table="table" :definitions="definitions" />
</template>
